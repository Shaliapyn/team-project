import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  participants: null,
}

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload
    },
  },
})

export const { setParticipants } = participantsSlice.actions

export const participantsState = (state) => state.participants.participants

export default participantsSlice.reducer
