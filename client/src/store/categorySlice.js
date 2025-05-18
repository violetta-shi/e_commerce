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
    }
});

export default categoriesSlice.reducer;
