import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice/movieSlice";
import authReducer from "./Slice/authSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer, 
    movie: movieReducer,
  },
});

export default Store;
