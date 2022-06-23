import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  member: {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    organisation: null,
    birthDate: null,
    score: null,
  },
}

const memberUpSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    updateMember: (state, action) => {
      state.member = action.payload
    },
  },
})

export const { updateMember } = memberUpSlice.actions

export const memberUpState = (state) => state.memberUp.member

export default memberUpSlice.reducer
