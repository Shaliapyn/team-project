import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visitedEvents: [],
}

const visitedEventsSlice = createSlice({
  name: 'visitedEvents',
  initialState,
  reducers: {
    addVisitedEvent: (state, action) => {
      state.visitedEvents = action.payload
    },
  },
})

export const { addVisitedEvent } = visitedEventsSlice.actions

export const visitedEventsState = (state) => state.visitedEvents.visitedEvents

export default visitedEventsSlice.reducer
