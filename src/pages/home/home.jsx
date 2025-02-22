// import React, { useEffect, useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Link } from "react-router-dom";
// import MovieList from "../../Components/movieList/movieList";

// const Home = () => {
//   const [popularMovies, setPopularMovies] = useState([]);

//   useEffect(() => {
//     fetchTrendingMovies(); // Fetch dynamic movies instead of always showing "Avengers"
//   }, []);

//   // Fetch a dynamic set of trending movies from OMDB API
//   const fetchTrendingMovies = async () => {
//     const trendingKeywords = [
//       "Batman",
//       "Superman",
//       "Spider-Man",
//       "Thor",
//       "Harry Potter",
//       "Iron Man",
//     ];
//     const randomMovie =
//       trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];

//     try {
//       const response = await fetch(
//         `http://www.omdbapi.com/?s=${randomMovie}&apikey=7b853542`
//       );
//       const data = await response.json();

//       if (data.Search) {
//         setPopularMovies(data.Search);
//       } else {
//         setPopularMovies([]);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-[500px] sm:h-[610px] md:h-[720px] lg:h-[800px] bg-gray-900 text-white border-2 border-pink-500 relative z-0">
//         <Carousel
//           autoPlay
//           transitionTime={3}
//           infiniteLoop
//           showStatus={false}
//           showThumbs={false}
//           showIndicators={true}
//         >
//           {popularMovies.length > 0 ? (
//             popularMovies.map((movie) => (
//               <Link
//                 key={movie.imdbID}
//                 to={`/movie/${movie.imdbID}`}
//                 className="no-underline text-white"
//               >
//                 <div className="relative w-full h-[480px] sm:h-[60px] md:h-[680px] lg:h-[730px] flex items-center justify-center border-2 border-amber-500">
//                   {/* Full-Size Background Image (No Blur) */}
//                   <div
//                     className="absolute inset-0 w-full h-full bg-cover bg-center"
//                     style={{
//                       backgroundImage: `url(${
//                         movie.Poster !== "N/A"
//                           ? movie.Poster
//                           : "https://via.placeholder.com/800"
//                       })`,
//                     }}
//                   ></div>

//                   {/* Movie Poster with Hover Effect */}
//                   <div className="border-4 border-teal-700 flex justify-center items-center h-full">
//                     <img
//                       src={
//                         movie.Poster !== "N/A"
//                           ? movie.Poster
//                           : "https://via.placeholder.com/800"
//                       }
//                       alt={movie.Title}
//                       className="w-[9%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[90%] 2xl:w-[60%] 
//                       h-[380px] sm:h-[480px] md:h-[550px] lg:h-[600px] xl:h-[700px] 2xl:h-[750px] 
//                       object-cover drop-shadow-2xl rounded-lg border-4 border-white 
//                       transition-transform transform hover:scale-110 hover:shadow-2xl"
//                            />
//                          </div>

//                   {/* Movie Title Overlay */}
//                   <div className="absolute bottom-10 left-0 right-0 text-center p-4 bg-black/70 rounded-lg mx-6 sm:mx-10 md:mx-16">
//                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
//                       {movie.Title}
//                     </h2>
//                     <p className="text-lg sm:text-xl text-gray-300">
//                       {movie.Year}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center text-lg">No movies found.</p>
//           )}
//         </Carousel>

//         {/* Movie List Section */}
//         <MovieList />
//       </div>
//     </>
//   );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../Components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies(); // Fetch dynamic movies instead of always showing "Avengers"
  }, []);

  // ✅ Fetch a dynamic set of trending movies from OMDB API
  const fetchTrendingMovies = async () => {
    const trendingKeywords = [
      "Batman",
      "Superman",
      "Spider-Man",
      "Thor",
      "Harry Potter",
      "Iron Man",
    ];
    const randomMovie =
      trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${randomMovie}&apikey=7b853542`
      );
      const data = await response.json();

      if (data.Search) {
        setPopularMovies(data.Search);
      } else {
        setPopularMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[500px] sm:h-[610px] md:h-[720px] lg:h-[800px] bg-gray-900 text-white ">
        <Carousel
          autoPlay
          transitionTime={3}
          infiniteLoop
          showStatus={false}
          showThumbs={false} >
          {popularMovies.length > 0 ? (
            popularMovies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                className="no-underline text-white"
              >
                <div className="relative w-full h-[500px] sm:h-[605px] md:h-[710px] lg:h-[790px] flex items-center justify-center border-2 border-amber-500">
                  {/* Full-Size Background Image (NO BLUR) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center brightness-7"
                    style={{
                      backgroundImage: `url(${
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/800"
                      })`,
                    }}
                  ></div>

                  {/* Movie Poster with Hover Effect */}
                  <div className="border-4 w-auto object-center object-fill border-pink-500 flex justify-center items-center h-auto">
                    <img
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/800"
                      }
                      alt={movie.Title}
                      className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[90%] 2xl:w-[60%] 
               h-[380px] sm:h-[480px] md:h-[550px] lg:h-[600px] xl:h-[700px] 2xl:h-[750px] 
               object-cover drop-shadow-2xl rounded-lg border-4 border-white 
               transition-transform transform hover:scale-110 hover:shadow-2xl"
                    />
                  </div>

                  {/* Movie Title Overlay */}
                  <div className="absolute bottom-10 left-0 right-0 text-center p-4 bg-black/70 rounded-lg mx-6 sm:mx-10 md:mx-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                      {movie.Title}
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300">
                      {movie.Year}
                    </p>
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