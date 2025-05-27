import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../api/client";
import {authorizationHeader, clearAccessToken, storeAccessToken} from "./util/auth.utils";

const initialState = {
    isLoading: false,
    isCreating: false,
    currentUser: undefined,
    loginErrorMessage: null,
    registrationErrorMessage: null
}

export const authStateSelector = state => state.auth;

export const getSelf = createAsyncThunk(
    'auth/getSelf',
    async () => {
        const response = await client.get('/api/v1/users/self', authorizationHeader());
        return response.status === 200 ? response.data : null;
    },
    {
        condition: (_, { getState }) => {
            const { currentUser } = authStateSelector(getState());
            return currentUser === undefined;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (body) => {
        const response = await client.post('/api/v1/auth/login', body);
        return { status: response.status, data: response.data };
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (body, { rejectWithValue }) => {
        try {
            const response = await client.post('/api/v1/auth/register', body);
            if (response.status !== 201) {
                console.log('Registration failed вдалтпдва:', response.data);
                return rejectWithValue(response.data);
            }
            return { status: response.status, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: 'Произошла ошибка при регистрации' });
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            clearAccessToken();
            state.currentUser = null;
        },
        dismissErrorMessage: (state) => {
            state.loginErrorMessage = null;
            state.registrationErrorMessage = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSelf.fulfilled, (state, action) => {
                state.currentUser = action.payload || null;
                if (!action.payload) {
                    clearAccessToken();
                }
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
                state.loginErrorMessage = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status === 200) {
                    state.currentUser = data;
                    storeAccessToken(data.access_token);
                    state.loginErrorMessage = null;
                } else {
                    state.loginErrorMessage = data?.message || 'Не удалось выполнить логин';
                }
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.loginErrorMessage = action.payload?.message || action.error.message || 'Не удалось выполнить логин';
            })
            .addCase(registerUser.pending, (state) => {
                state.isCreating = true;
                state.registrationErrorMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status === 201) {
                    state.registrationErrorMessage = null;
                } else {
                    state.registrationErrorMessage = data?.message || 'Произошла ошибка при регистрации.';
                }
                state.isCreating = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isCreating = false;
                state.registrationErrorMessage = action.payload?.message || action.error.message || 'Произошла ошибка при регистрации.';
            });
    }
});

export const { logout, dismissErrorMessage } = authSlice.actions;

export default authSlice.reducer;
