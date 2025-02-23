import React from "react";
import { useSelector } from "react-redux";
import Cards from "../card/card";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Favorite Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((movie) => <Cards key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="col-span-4 text-center text-lg">No favorites added.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
