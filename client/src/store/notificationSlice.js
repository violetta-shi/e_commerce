import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
}

export const notificationsStateSelector = state => state.notifications;

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            const notification = action.payload;
            state.notifications.push(notification);
        },
        removeNotification: (state, action) => {
            const idx = action.payload;
            state.notifications.splice(idx, 1);
        },
    },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;