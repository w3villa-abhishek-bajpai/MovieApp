import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="inline-block transition-transform duration-200 relative rounded-lg overflow-hidden m-1 cursor-pointer min-w-[200px] h-[300px] border border-gray-600">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.imdbID}`} className="no-underline text-white">
          <div className="inline-block transition-transform duration-200 relative rounded-lg overflow-hidden m-1 cursor-pointer min-w-[200px] h-[300px] border border-gray-600 hover:scale-110 hover:z-50 shadow-lg">
            {/* Movie Poster */}
            <img
              className="h-full w-full object-cover"
              src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/300"}
              alt={movie?.Title}
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 p-4 h-[290px] w-[85%] flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="font-bold text-lg mb-2">{movie?.Title}</div>
              <div className="text-sm mb-1">{movie?.Year}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
