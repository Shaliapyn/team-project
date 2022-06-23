import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentMembers: null,
}

const currentMembersSlice = createSlice({
  name: 'currentMembers',
  initialState,
  reducers: {
    setCurrentMembers: (state, action) => {
      state.currentMembers = action.payload
    },
  },
})

export const { setCurrentMembers } = currentMembersSlice.actions

export const currentMembersState = (state) => state.currentMembers.currentMembers

export default currentMembersSlice.reducer
