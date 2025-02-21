import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("loggedInUser") || null, // Persist login state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("loggedInUser", action.payload);
    },
    signup: (state, action) => {
      state.user = action.payload.email;
      localStorage.setItem("loggedInUser", action.payload.email);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
