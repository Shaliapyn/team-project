import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './slices/eventsSlice'
import searchTermReducer from './slices/filterSlice'
import memberReducer from './slices/memberSlice'
import membersReducer from './slices/membersSlice'
import memberUpReducer from './slices/memberUpSlice'
import participantsReducer from './slices/participantsSlice'
import selectValueReducer from './slices/selectSlice'
import visitedEventsReducer from './slices/visitedEventsSlice'

export const store = configureStore({
  reducer: {
    member: memberReducer,
    members: membersReducer,
    events: eventsReducer,
    memberUp: memberUpReducer,
    participants: participantsReducer,
    searchTerm: searchTermReducer,
    value: selectValueReducer,
    visitedEvents: visitedEventsReducer,
  },
})
