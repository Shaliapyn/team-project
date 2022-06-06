import { configureStore } from "@reduxjs/toolkit";
import memberReducer from './slices/memberSlice';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
    reducer: {
        member: memberReducer,
        events: eventsReducer,
    }
});