import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredMembers: null,
}

const filteredMembersSlice = createSlice({
  name: 'filteredMembers',
  initialState,
  reducers: {
    setFilteredMembers: (state, action) => {
      state.filteredMembers = action.payload
    },
  },
})

export const { setFilteredMembers } = filteredMembersSlice.actions

export const filteredMembersState = (state) => state.filteredMembers.filteredMembers

export default filteredMembersSlice.reducer
