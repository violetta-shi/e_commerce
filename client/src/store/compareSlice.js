import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    isLoading: false,
    error: null
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            const product = action.payload;
            state.items[product.id] = product;
        },
        removeFromCompare: (state, action) => {
            const productId = action.payload;
            delete state.items[productId];
        },
        clearCompare: (state) => {
            state.items = {};
        }
    }
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;

export const compareStateSelector = (state) => state.compare;

export default compareSlice.reducer; 