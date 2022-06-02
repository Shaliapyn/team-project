import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./slices/membersSlice"

export default configureStore({
    reducer:{
        members: memberReducer
    } 
})