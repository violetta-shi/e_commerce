import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {client} from "../api/client";
import {authorizationHeader} from "./util/auth.utils";

const initialState = {
    state: 'loading',
    error: null,
    data: [],
}

export const getUsers = createAsyncThunk(
    'users/findAll',
    async () => {
        const response = await client.get('/api/v1/users', authorizationHeader())
        return response.data
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers: (state) => {
            state.state = 'loading'
        },
    },
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.state = 'loaded';
            state.data = action.payload;
        })
    }
})

export const { fetchUsers } = usersSlice.actions

export default usersSlice.reducer
