


import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites, addToWishlist, removeFromWishlist } from "../../Store/Slice/favoritesSlice";
import { Heart, Bookmark } from "lucide-react";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const wishlist = useSelector((state) => state.favorites.wishlist);

  // MDb properties
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const isWishlisted = wishlist.some((wish) => wish.id === movie.id);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-[400px] sm:w-[350px] md:w-[300px] lg:w-[290px] xl:w-[400px] h-[450px] rounded-lg overflow-hidden border border-gray-600 border-2 border-pink-500">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={420} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="relative w-[400px] sm:w-[350px] md:w-[300px] lg:w-[290px] xl:[400px] h-[450px] rounded-lg overflow-hidden border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105  bg-white border-3 border-yellow-500" >
          {/* Favorite & Wishlist Buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            {/* Favorite Button */}
            <button
              onClick={() => isFavorite ? dispatch(removeFromFavorites(movie.id)) : dispatch(addToFavorites(movie))}
              className={`p-2 rounded-full transition-all ${isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"} shadow-md`}
            >
              <Heart size={20} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => isWishlisted ? dispatch(removeFromWishlist(movie.id)) : dispatch(addToWishlist(movie))}
              className={`p-2 rounded-full transition-all ${isWishlisted ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"} shadow-md`}
            >
              <Bookmark size={20} />
            </button>
          </div>

          {/* Movie Poster */}
          <Link to={`/movie/${movie.id}`} className="no-underline text-white">
            <img 
              className="w-full h-full object-cover" 
              src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/400"} 
              alt={movie?.title} 
            />

            {/* Movie Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 hover:opacity-100 transition-opacity duration-300 text-center">
              <h3 className="text-lg font-bold mb-1">{movie?.title}</h3>
              <p className="text-sm text-gray-300">{movie?.release_date?.split("-")[0]}</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cards;
