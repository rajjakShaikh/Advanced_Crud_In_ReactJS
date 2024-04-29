import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./data";
const userSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        
    }
})