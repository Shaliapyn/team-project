import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    members: null
}

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        setMembers: (state, action) => {
            state.members = action.payload
        },
    }
})

export const { setMembers } = membersSlice.actions;

export const membersState = (state => state.members.members);

export default membersSlice.reducer;