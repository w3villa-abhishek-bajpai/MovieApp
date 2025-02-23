import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice/movieSlice";
import authReducer from "./Slice/authSlice";
import favoritesReducer from "./Slice/favoritesSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer, 
    movie: movieReducer,
    favorites: favoritesReducer,
  },
});

export default Store;
