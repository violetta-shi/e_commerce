import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../api/client";
import {authorizationHeader} from "./util/auth.utils";

const groupBy = (arr, key) => {
    return arr.reduce((agg, element) => {
        (agg[element[key]] = agg[element[key]] || []).push(element);
        return agg;
    }, {});
};

const initialState = {
    isLoading: false,
    isCreating: false,
    products: {},
    statistics: undefined,
    error: null,
}

export const productsStateSelector = state => state.products;

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (categoryId) => {
        const response = await client.get(`/api/v1/categories/${categoryId}/products`, authorizationHeader());
        return { categoryId, status: response.status, data: response.data };
    },
    {
        condition: (categoryId, { getState }) => {
            const { products } = productsStateSelector(getState());
            return products[categoryId] === undefined;
        }
    }
);

export const getProductStatistics = createAsyncThunk(
    "products/getProductStatistics",
    async ({start, end}) => {
        const response = await client.get(`/api/v1/products/statistics?startMonth=${start}&endMonth=${end}`,
            authorizationHeader());
        return { status: response.status, data: response.data };
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (body) => {
        const {image, ...data} = body;
        const formData = new FormData();
        formData.append("image", image[0]);
        formData.append("data", JSON.stringify(data));
        const response = await client.post(`/api/v1/products`, formData, authorizationHeader());
        return { status: response.status, data: response.data };
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearFetchedProducts: (state, action) => {
            const categoryId = action.payload;
            delete state.products[categoryId];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                const { categoryId, status, data } = action.payload;
                if (status === 200) {
                    state.products[categoryId] = groupBy(data, "grouping_key");
                } else {
                    state.error = 'Произошла ошибка, попробуйте позже.'
                }
                state.isLoading = false;
            })
            .addCase(getProductStatistics.pending, (state) => {
                state.statistics = undefined;
            })
            .addCase(getProductStatistics.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status === 200) {
                    state.statistics = data;
                } else {
                    state.error = 'Произошла ошибка, попробуйте позже.'
                }
            })
            .addCase(createProduct.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status !== 200) {
                    state.error = data?.message || 'Произошла ошибка, попробуйте позже.'
                }
                state.isCreating = false;
            })
    }
});

export const { clearFetchedProducts } = productsSlice.actions;

export default productsSlice.reducer;
