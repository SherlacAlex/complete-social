import { createSlice } from "@reduxjs/toolkit";
import { UserAuth, UserDetails } from "../models/UserAuth";

const initialState: UserAuth = {
    isAuthenticated: false,
    userData: Object.create(null),
    isLoading: false,
} as UserAuth

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        logIn: (state, action) => {
            state.isAuthenticated = true;
            state.userData = action.payload.userData;
            state.isLoading = false;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.userData = Object.create(null);
            state.isLoading = false;
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;