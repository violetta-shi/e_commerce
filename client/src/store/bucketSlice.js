import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../api/client";
import {authorizationHeader} from "./util/auth.utils";

const initialState = {
    items: {},
    isCreating: false,
}

export const bucketStateSelector = state => state.bucket;

export const countProductsInBucket = items => Object.entries(items)
    .reduce((sum, [_, { amount }]) => sum + amount, 0);
export const countBucketPrice = items => {
    const finalPrice = Object.entries(items)
        .reduce((sum, [_, {product, amount}]) => {
            return sum + product.price * amount;
        }, 0);
    return finalPrice.toFixed(2);
};
export const isBucketEmpty = items => Object.keys(items).length === 0;

export const createOrder = createAsyncThunk(
    "bucket/createOrder",
    async ({ items, order }) => {
        const body = {
            items: Object.values(items),
            ...order,
        }
        const response = await client.post("/api/v1/orders", body, authorizationHeader());
        return { status: response.status, data: response.data };
    }
)

export const bucketSlice = createSlice({
    name: "bucket",
    initialState,
    reducers: {
        addItemToBucket: (state, action) => {
            const product = action.payload;
            const productInBucket = state.items[product.id];
            if (productInBucket) {
                productInBucket.amount++;
            } else {
                state.items[product.id] = {
                    product,
                    amount: 1,
                }
            }
        },
        removeItemFromBucket: (state, action) => {
            const product = action.payload;
            const productInBucket = state.items[product.id];
            if (productInBucket) {
                productInBucket.amount--;
                if (productInBucket.amount <= 0) {
                    delete state.items[product.id]
                }
            }
        },
        removeFromBucket: (state, action) => {
            const product = action.payload;
            delete state.items[product.id];
        },
        clearBucket: (state) => {
            state.items = {};
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                //TODO handle order response
                state.items = {};
                state.isCreating = false;
            })
    }
});

export const { addItemToBucket, removeItemFromBucket, removeFromBucket, clearBucket } = bucketSlice.actions;

export default bucketSlice.reducer;
