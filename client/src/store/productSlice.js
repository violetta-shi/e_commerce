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
    isUpdating: false,
    isDeleting: false,
    products: {},
    allProducts: [],
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

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const response = await client.get(`/api/v1/products`, authorizationHeader());
        return { status: response.status, data: response.data };
    }
);

export const getProductStatistics = createAsyncThunk(
    "products/getProductStatistics",
    async ({start, end}) => {
        const response = await client.get(`/api/v1/products/statistics?startMonth=${start}&endMonth=${end}`,
            authorizationHeader());
            console.log("GET PRODUCTS", response);
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

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, data }) => {
        const response = await client.put(`/api/v1/products/${id}`, data, authorizationHeader());
        return { id, status: response.status, data: response.data };
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        const response = await client.delete(`/api/v1/products/${id}`, authorizationHeader());
        return { id, status: response.status };
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
                    state.error = data?.message || 'Произошла ошибка, попробуйте позже.'
                }
                state.isLoading = false;
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                 const { status, data } = action.payload;
                if (status === 200) {
                    state.allProducts = data;
                } else {
                    state.error = data?.message || 'Произошла ошибка при загрузке товаров.'
                }
                state.isLoading = false;
            })
             .addCase(fetchAllProducts.rejected, (state, action) => {
                 state.isLoading = false;
                 state.error = action.error.message || 'Произошла ошибка при загрузке товаров.'
             })
            .addCase(getProductStatistics.pending, (state) => {
                state.statistics = undefined;
            })
            .addCase(getProductStatistics.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                if (status === 200) {
                    state.statistics = data;
                } else {
                    state.error = data?.message || 'Произошла ошибка, попробуйте позже.'
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
            .addCase(updateProduct.pending, (state) => {
                 state.isUpdating = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id, status, data } = action.payload;
                 if (status === 200) {
                    const index = state.allProducts.findIndex(product => product.id === id);
                     if (index !== -1) {
                         state.allProducts[index] = { ...state.allProducts[index], ...data };
                     }
                 } else {
                     state.error = data?.message || 'Произошла ошибка при обновлении товара.'
                 }
                 state.isUpdating = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                 state.isUpdating = false;
                 state.error = action.error.message || 'Произошла ошибка при обновлении товара.'
            })
            .addCase(deleteProduct.pending, (state) => {
                 state.isDeleting = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                 if (status === 200) {
                    state.allProducts = state.allProducts.filter(product => product.id !== id);
                 } else {
                     state.error = action.payload.data?.message || 'Произошла ошибка при удалении товара.'
                 }
                 state.isDeleting = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                 state.isDeleting = false;
                 state.error = action.error.message || 'Произошла ошибка при удалении товара.'
            });
    }
});

export const { clearFetchedProducts } = productsSlice.actions;

export default productsSlice.reducer;
