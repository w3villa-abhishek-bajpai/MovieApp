

import React from "react";
import { useSelector } from "react-redux";
import Cards from "../card/card";
import Sidebar from "../sidebar/Sidebar";

const MovieList = () => {
  const movieList = useSelector((state) => state.movie.movies);
  const filters = useSelector((state) => state.movie.filters);

  // Filter movies based on Redux filters
  const filteredMovies = movieList.filter((movie) => {
    const meetsGenre = filters.genre ? movie.genre_ids.includes(parseInt(filters.genre)) : true;
    const meetsYear = filters.year ? movie.release_date.startsWith(filters.year) : true;
    const meetsRating = filters.rating ? movie.vote_average >= parseInt(filters.rating) : true;
    return meetsGenre && meetsYear && meetsRating;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Movie Grid */}
      <div className="w-full h-full bg-black text-white px-8 py-6  border-2 border-red-500">
        <h2 className="text-3xl font-bold mb-6">Movie Listings</h2>

        <div className="flex flex-wrap justify-center gap-9 border-2 border-fuchsia-500">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => <Cards key={movie.id} movie={movie} />)
          ) : (
            <p className="text-lg">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

