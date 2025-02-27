import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  wishlist: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.favorites.some((movie) => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((movie) => movie.id !== action.payload);
    },
    addToWishlist: (state, action) => {
      if (!state.wishlist.some((movie) => movie.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites, addToWishlist, removeFromWishlist } = favoritesSlice.actions;
export default favoritesSlice.reducer;
