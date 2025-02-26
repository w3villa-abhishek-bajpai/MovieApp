import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../Components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    console.log("called----")
    fetchTrendingMovies();
  }, []);

  // ✅ Fetch trending movies from TMDb API
  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=e00941df3fc0eaa106c5464b43b3f69d`
      );
      const data = await response.json();
   console.log("response checking ",response)
      if (data.results) {
        setPopularMovies(data.results);
      } else {
        setPopularMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-900 text-white pb-[100px] ">
      <h1 className="text-white">hii</h1>
      <div>
      <Carousel autoPlay transitionTime={3} infiniteLoop showStatus={false} showThumbs={false}>
        {popularMovies.length > 0 ? (
          popularMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="no-underline text-white">
              <div className="relative w-full h-[500px] sm:h-[610px] md:h-[720px] lg:h-[800px] flex items-center justify-center border-2 border-amber-600">
                {/* ✅ Full-Screen Background Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center brightness-75 transition-all duration-500 hover:brightness-50 border-4 border-red-400"
                  style={{
                    backgroundImage: `url(${ 
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                        : "https://via.placeholder.com/800"
                    })`,
                  }}
                ></div>

                {/* ✅ Movie Title Overlay */}
                <div className="absolute bottom-10 left-0 right-0 text-center p-4 bg-black/80 backdrop-blur-md rounded-lg mx-6 sm:mx-10 md:mx-16 transition-all duration-300 border-2 border-white">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{movie.title}</h2>
                  <p className="text-lg sm:text-xl text-gray-300">{movie.release_date}</p>

                  {/* ✅ View Details Button (Appears on Hover) */}
                  <div className="opacity-0 transition-opacity duration-300 hover:opacity-100 mt-4">
                    <button className="bg-red-600 px-5 py-2 text-lg font-semibold rounded-md shadow-md hover:bg-red-700 transition border-3 border-yellow-500">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-lg">No movies found.</p>
        )}
      </Carousel>
      </div>
      <div className=""></div>
      {/* ✅ Movie List Section */}
      <MovieList />
    </div>
  );
};

export default Home;
