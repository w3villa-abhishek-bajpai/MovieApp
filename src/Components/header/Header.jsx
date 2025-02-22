import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slice/authSlice";
import { setMovies } from "../../Store/Slice/movieSlice";
import { Search, Menu, X } from "lucide-react";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Load "Avengers" by default
  useEffect(() => {
    getData("Avengers");
  }, []);

  // ✅ Fetch movies while typing
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const delaySearch = setTimeout(() => {
        getData(searchQuery);
      }, 500);
      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery]);

  // ✅ Fetch movies from API
  const getData = async (query) => {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: { apikey: "7b853542", s: query },
      });

      if (response.data.Search) {
        dispatch(setMovies(response.data.Search));
      } else {
        dispatch(setMovies([]));
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div className="w-full h-[80px] px-6 py-4 flex items-center justify-between bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg border-3 border-white">
      {/* IMDb Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            className="w-24 sm:w-20 h-auto cursor-pointer transition-transform hover:scale-105"
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDb Logo"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        <Link
          to="/movies/popular"
          className="text-lg text-white hover:text-red-500 transition duration-200"
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className="text-lg text-white hover:text-red-500 transition duration-200"
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="text-lg text-white hover:text-red-500 transition duration-200"
        >
          Upcoming
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[45px] sm:h-[50px] px-4 pl-12 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
       
      </div>

      {/* Authentication Buttons */}
      <div className="hidden lg:flex gap-4">
        {user ? (
          <>
            <span className="text-white font-semibold">Welcome, {user}</span>
            <button
              onClick={() => dispatch(logout())}
              className="w-[120px] h-[45px] flex items-center justify-center bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-[120px] h-[45px] flex items-center justify-center bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-[120px] h-[45px] flex items-center justify-center bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        {isMenuOpen ? (
          <X
            className="text-white cursor-pointer transition-transform transform hover:scale-110"
            size={30}
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <Menu
            className="text-white cursor-pointer transition-transform transform hover:scale-110"
            size={30}
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute top-[80px] left-0 w-full bg-gray-900  flex flex-col items-center gap-6 py-6 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/movies/popular"
          className="text-lg text-white hover:text-red-500 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className="text-lg text-white hover:text-red-500 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="text-lg text-white hover:text-red-500 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Upcoming
        </Link>

        {user ? (
          <>
            <span className="text-white font-semibold">Welcome, {user}</span>
            <button
              onClick={() => {
                dispatch(logout());
                setIsMenuOpen(false);
              }}
              className="w-[120px] h-[45px] flex items-center justify-center bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-[120px] h-[45px] flex items-center justify-center bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-[120px] h-[45px] flex items-center justify-center bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
