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
        <div className=" w-[300px] sm:w-[350px] md:w-[360px] lg:w-[460px] h-[420px] rounded-lg overflow-hidden border border-gray-600">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={420} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.imdbID}`} className="no-underline text-white">
          <div className="relative w-[300px] sm:w-[350px] md:w-[360px] lg:w-[440px] h-[420px] rounded-lg overflow-hidden border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105 flex-wrap">
            <img className="w-full h-full object-cover" src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/400"} alt={movie?.Title} />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 hover:opacity-100 transition-opacity duration-300 text-center">
              <h3 className="text-lg font-bold mb-1">{movie?.Title}</h3>
              <p className="text-sm text-gray-300">{movie?.Year}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
