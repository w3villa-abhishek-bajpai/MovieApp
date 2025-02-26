import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice/movieSlice";
import authReducer from "./Slice/authSlice";
import favoritesReducer from "./Slice/favoritesSlice";
import reviewsReducer from "./Slice/reviewsSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer, 
    movie: movieReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
  },
});

export default Store;
