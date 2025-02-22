import React from "react";
import { useSelector } from "react-redux";
import Cards from "../card/card";

const movieList = () => {
  const movieList = useSelector((state) => state.movie.movies); // ✅ Fetch from Redux

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white   border-2 border-green-600">
      {/* Movie Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6 border-2 border-yellow-500">
  {movieList.length > 0 ? (
    movieList.map((movie, index) => (
      <Cards key={movie.imdbID || index} movie={movie} />
    ))
  ) : (
    <p className="w-full text-center text-lg">No movies found.</p>
  )}
</div>

    </div>
  );
};

export default movieList;



