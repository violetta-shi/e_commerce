import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../api/client";
import {authorizationHeader} from "./util/auth.utils";

const initialState = {
    isLoading: false,
    categories: undefined,
    error: null,
}

export const categoriesStateSelector = state => state.categories;

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        const response = await client.get("/api/v1/categories", authorizationHeader());
        return { status: response.status, data: response.data };
    },
    {
        condition: (_, { getState }) => {
            const { categories } = categoriesStateSelector(getState());
            return categories === undefined;
        }
    }

)

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async(body)=>{
        const{image, ...data} = body;
        const formData = new FormData();
        formData.append("image", image[0]);
        formData.append("data", JSON.stringify(data));
        const response = await client.post("/api/v1/categories", formData, authorizationHeader());
        return {status: response.status, data: response.data}
    }

)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, data }) => {
        const { image, ...rest } = data;
        const formData = new FormData();
        if (image && image.length > 0) {
            formData.append("image", image[0]);
        }
        formData.append("data", JSON.stringify(rest));
        const response = await client.put(`/api/v1/categories/${id}`, formData, authorizationHeader());
        return { id, status: response.status, data: response.data };
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id) => {
        const response = await client.delete(`/api/v1/categories/${id}`, authorizationHeader());
        return { id, status: response.status };
    }
);

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status === 200) {
                    state.categories = data;
                } else {
                    state.error = 'Ошибка загрузки. Попробуйте подождать и обновить страницу.'
                }
                state.isLoading = false;
            })
            .addCase(createCategory.pending, (state)=>{
                state.isCreating = true;
            })
            .addCase(createCategory.fulfilled, (state, action)=>{
                const {status, data} = action.payload;
                if(status !== 200){
                    state.erroe = data?.message || 'Произошла ошибка, попробуй позже'
                }
                state.isCreating = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const { id, status, data } = action.payload;
                if (status === 200) {
                    if (state.categories) {
                        const idx = state.categories.findIndex(cat => cat.id === Number(id));
                        if (idx !== -1) {
                            state.categories[idx] = { ...state.categories[idx], ...data };
                        }
                    }
                } else {
                    state.error = data?.message || 'Ошибка при обновлении категории.'
                }
                state.isUpdating = false;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.error.message || 'Ошибка при обновлении категории.'
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isDeleting = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                if (status === 200 && state.categories) {
                    state.categories = state.categories.filter(cat => cat.id !== Number(id));
                } else {
                    state.error = action.payload.data?.message || 'Ошибка при удалении категории.'
                }
                state.isDeleting = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isDeleting = false;
                state.error = action.error.message || 'Ошибка при удалении категории.'
            });
    }
});

export default categoriesSlice.reducer;
