import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { type } = useParams();

  useEffect(() => {
    getData(type ? type : "Avengers"); // Default to Avengers when no type is provided
  }, [type]);

  const getData = async (query) => {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: "7b853542",
          s: query,
        },
      });

      if (response.data.Search) {
        setMovieList(response.data.Search);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      getData(searchQuery);
    }
  };

  return (
    <div className="px-12 pb-12">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border border-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          🔍
        </button>
      </form>

      {/* Section Title */}
      <h2 className="text-2xl font-bold my-10 text-center">
        {(type ? type : "POPULAR").toUpperCase()}
      </h2>

      {/* Movie Cards List */}
      <div className="flex flex-wrap justify-center gap-4">
        {movieList.length > 0 ? (
          movieList.map((movie) => <Cards key={movie.omdbID} movie={movie} />)
        ) : (
          <p className="text-white text-center text-lg">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
