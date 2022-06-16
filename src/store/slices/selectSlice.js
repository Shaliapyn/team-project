import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

const selectSlice = createSlice({
    name: "value",
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setSelected} = selectSlice.actions;

export const selectState = ((state) => state.value.value)

export default selectSlice.reducer;