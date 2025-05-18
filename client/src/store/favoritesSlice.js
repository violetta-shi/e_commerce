import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    isLoading: false,
    error: null
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const product = action.payload;
            state.items[product.id] = product;
        },
        removeFromFavorites: (state, action) => {
            const productId = action.payload;
            delete state.items[productId];
        },
        clearFavorites: (state) => {
            state.items = {};
        }
    }
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export const favoritesStateSelector = (state) => state.favorites;

export default favoritesSlice.reducer; 