import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../models/UserAuth";

const initialState: UserAuth = new UserAuth({
    loggedStatus: false,
    userData: null
})

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        logIn: (state, action) => {
            state.loggedStatus = true;
            state.userData = action.payload.userData;
        },
        logOut: (state) => {
            state.loggedStatus = false;
            state.userData = null;
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;