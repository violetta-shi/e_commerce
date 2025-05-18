import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "./userSlice";
import authReducer from "./authSlice";
import categoriesReducer from "./categorySlice";
import productsReducer from "./productSlice";
import bucketReducer from "./bucketSlice";
import notificationReducer from "./notificationSlice";
import favoritesReducer from './favoritesSlice';
import compareReducer from './compareSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        categories: categoriesReducer,
        products: productsReducer,
        bucket: bucketReducer,
        notifications: notificationReducer,
        favorites: favoritesReducer,
        compare: compareReducer
    },
});
