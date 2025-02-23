// import React, { useEffect, useState } from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Link } from "react-router-dom";

// const Cards = ({ movie }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <div className=" w-[300px] sm:w-[350px] md:w-[350px] lg:w-[360px] h-[420px] rounded-lg overflow-hidden border border-gray-600">
//           <SkeletonTheme color="#202020" highlightColor="#444">
//             <Skeleton height={420} duration={2} />
//           </SkeletonTheme>
//         </div>
//       ) : (
//         <Link to={`/movie/${movie.imdbID}`} className="no-underline text-white">
//           <div className="relative w-[300px] sm:w-[350px] md:w-[350px] lg:w-[360px] h-[420px] rounded-lg overflow-hidden border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105 flex-wrap">
//             <img className="w-full h-full object-cover" src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/400"} alt={movie?.Title} />
//             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 hover:opacity-100 transition-opacity duration-300 text-center">
//               <h3 className="text-lg font-bold mb-1">{movie?.Title}</h3>
//               <p className="text-sm text-gray-300">{movie?.Year}</p>
//             </div>
//           </div>
//         </Link>
//       )}
//     </>
//   );
// };

// export default Cards;






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

  // Check if the movie is already in Favorites or Wishlist
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
  const isWishlisted = wishlist.some((wish) => wish.imdbID === movie.imdbID);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[360px] h-[420px] rounded-lg overflow-hidden border border-gray-600">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={420} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="relative w-[300px] sm:w-[350px] md:w-[350px] lg:w-[360px] h-[420px] rounded-lg overflow-hidden border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105 flex-wrap bg-white">
          {/* Favorite & Wishlist Buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            {/* Favorite Button */}
            <button
              onClick={() => isFavorite ? dispatch(removeFromFavorites(movie.imdbID)) : dispatch(addToFavorites(movie))}
              className={`p-2 rounded-full transition-all ${isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"} shadow-md`}
            >
              <Heart size={20} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => isWishlisted ? dispatch(removeFromWishlist(movie.imdbID)) : dispatch(addToWishlist(movie))}
              className={`p-2 rounded-full transition-all ${isWishlisted ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"} shadow-md`}
            >
              <Bookmark size={20} />
            </button>
          </div>

          {/* Movie Poster */}
          <Link to={`/movie/${movie.imdbID}`} className="no-underline text-white">
            <img className="w-full h-full object-cover" src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/400"} alt={movie?.Title} />

            {/* Movie Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 hover:opacity-100 transition-opacity duration-300 text-center">
              <h3 className="text-lg font-bold mb-1">{movie?.Title}</h3>
              <p className="text-sm text-gray-300">{movie?.Year}</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cards;
