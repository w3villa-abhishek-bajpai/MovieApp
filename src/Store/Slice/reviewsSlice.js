import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: {}, 
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action) => {
      const { movieId, review } = action.payload;
      if (!state.reviews[movieId]) {
        state.reviews[movieId] = [];
      }
      state.reviews[movieId].push(review);
    },
    upvoteReview: (state, action) => {
      const { movieId, reviewId } = action.payload;
      const review = state.reviews[movieId]?.find((r) => r.id === reviewId);
      if (review) {
        review.upvotes += 1;
      }
    },
    downvoteReview: (state, action) => {
      const { movieId, reviewId } = action.payload;
      const review = state.reviews[movieId]?.find((r) => r.id === reviewId);
      if (review) {
        review.downvotes += 1;
      }
    },
    reportReview: (state, action) => {
      const { movieId, reviewId } = action.payload;
      const review = state.reviews[movieId]?.find((r) => r.id === reviewId);
      if (review) {
        review.reported = true;
      }
    },
  },
});

export const { addReview, upvoteReview, downvoteReview, reportReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
