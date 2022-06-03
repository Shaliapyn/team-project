import { configureStore } from "@reduxjs/toolkit";
import memberReducer from './slices/memberSlice';

export const store = configureStore({
    reducer: {
        member: memberReducer,
    }
});