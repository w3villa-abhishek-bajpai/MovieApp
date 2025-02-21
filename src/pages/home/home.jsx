import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../Components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=Avengers&apikey=7b853542")
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setPopularMovies(data.Search);
        } else {
          setPopularMovies([]);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <div className="w-full  h-[500px] sm:h-[610px] md:h-[720px] lg:h-[840px] bg-gray-900 text-white border-2 border-red-400 ">
        <Carousel
          // showThumbs={false}
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
                <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center ">
                  
                  {/* Blurred Background Image */}
                  <div
                    className="absolute  w-full h-full  bg-cover bg-center blur-lg brightness-50"
                    style={{
                      backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/600"})`,
                    }}
                  ></div>

                  {/* Foreground Movie Poster (Bigger & Responsive) */}
                  <div className="relative  flex justify-center items-center h-full">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/600"}
                      alt={movie.Title}
                      className="w-[80%] sm:w-[60%] md:w-[55%] lg:w-[55%] min-h-[600px] object-contain drop-shadow-2xl rounded-lg border-4 border-white"
                    />
                  </div>

                  {/* Movie Title Overlay */}
                  <div className="absolute bottom-10 left-0 right-0 text-center p-4 bg-black/60">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{movie.Title}</h2>
                    <p className="text-lg sm:text-xl text-gray-300">{movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-lg">No movies found.</p>
          )}
        </Carousel>

        {/* Movie List Section */}
        <MovieList />
      </div>
    </>
  );
};

export default Home;
