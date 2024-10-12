import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            login: "",
            accessToken: "",
            expire: "",
            isLogin: false
        }
    },
    reducers: {
        addUser(state, action) {
            state.user.login = action.payload.login;
            state.user.accessToken = action.payload.accessToken;
            state.user.expire = action.payload.expire;
            state.user.isLogin = true;
        },
        removeUser(state) {
            state.user.login = "";
            state.user.accessToken = "";
            state.user.expire = "";
            state.user.isLogin = false;
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;