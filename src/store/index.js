import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./slices/membersSlice";
import memberUpReducer from "./slices/memberUpSlice"


export default configureStore({
    reducer:{
        members: memberReducer,
        member: memberUpReducer
    } 
})