import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../Components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=Avengers&apikey=7b853542") // 's' for searching movies
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setPopularMovies(data.Search); // Correct way to access movies
        } else {
          setPopularMovies([]); // Handle case where no results are found
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <Link
                key={movie.omdbID}
                to={`/movie/${movie.omdbID}`}
                className="no-underline text-white"
              >
                <div className="relative w-full">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                    alt={movie.Title}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                    <h2 className="text-2xl font-bold">{movie.Title}</h2>
                    <div className="flex items-center gap-2 text-lg">
                      <span>{movie.Year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-lg">No movies found.</p>
          )}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
