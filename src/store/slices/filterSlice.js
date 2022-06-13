import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "searchTerm",
    initialState: {
        searchTerm: ""
    },
    reducers: {
        setInput: (state, action) => {
            state.searchTerm = action.payload
        }
    }
})

export const {setInput} = inputSlice.actions;
export const inputState = (state => state.searchTerm.searchTerm);
export default inputSlice.reducer;