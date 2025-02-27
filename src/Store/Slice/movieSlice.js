


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  filters: {
    genre: "",
    year: "",
    rating: "",
    platform: "",
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload; //  Store filter values in Redux
    },
  },
});

export const { setMovies, setFilters } = movieSlice.actions;
export default movieSlice.reducer;
