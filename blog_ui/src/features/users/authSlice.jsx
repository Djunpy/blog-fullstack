import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    tokenAccess: null,
    tokenRefresh: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, tokenAccess, tokenRefresh } = action.payload;
            state.tokenAccess = tokenAccess;
            state.tokenRefresh = tokenRefresh;
            state.user = user;
        },
        setAccessToken: (state, action) => {
            state.tokenAccess = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            // state.tokenRefresh = null;
            state.tokenAccess = null;
        },
    },
});

export const { setCredentials, setAccessToken, logOut } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export default authSlice.reducer;
