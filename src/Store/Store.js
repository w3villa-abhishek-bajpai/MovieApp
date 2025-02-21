import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slice/authSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default Store;
