import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import { Search } from "lucide-react";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { type } = useParams();

  useEffect(() => {
    getData(type ? type : "Avengers");
  }, [type]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        getData(searchQuery);
      }
    }, 500); // Add a small delay to avoid excessive API calls

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const getData = async (query) => {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: "7b853542",
          s: query,
        },
      });

      if (response.data.Search) {
        // Display only the first 12 movies
        setMovieList(response.data.Search.slice(0, 12));
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-10">
      {/* Search Bar */}
      <div className="flex justify-center items-center w-full max-w-4xl mx-auto min-h-[70px] p-3 relative">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[50px] px-4 pl-12 border border-gray-500 bg-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </div>

      {/* Movie Cards Grid (Responsive Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-6">
        {movieList.length > 0 ? (
          movieList.map((movie, index) => (
            <Cards key={movie.imdbID || index} movie={movie} />
          ))
        ) : (
          <p className="col-span-4 text-center text-lg">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
