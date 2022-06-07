import { configureStore } from "@reduxjs/toolkit";
import memberReducer from './slices/memberSlice';
import eventsReducer from './slices/eventsSlice';
import membersReducer from "./slices/membersSlice";
import memberUpReducer from "./slices/memberUpSlice"

export const store = configureStore({
    reducer: {
        member: memberReducer,
        members: membersReducer,
        events: eventsReducer,
        memberUp: memberUpReducer,
    }
});
