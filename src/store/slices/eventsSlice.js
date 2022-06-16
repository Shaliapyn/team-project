import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: null
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents(state, action) {
            state.events = action.payload
        }
    }
})

export const { setEvents } = eventsSlice.actions;

export const eventsState = (state => state.events.events);

export default eventsSlice.reducer;