
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slice/authSlice";
import { setMovies } from "../../Store/Slice/movieSlice";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const TMDB_API_KEY = "e00941df3fc0eaa106c5464b43b3f69d";

const Header = ({ darkMode, setDarkMode }) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const searchRef = useRef(null);

  // ✅ Fetch User from Local Storage
  let storedUser = localStorage.getItem("loggedInUser");
  let userEmail = "Guest";

  if (storedUser) {
    try {
      storedUser = JSON.parse(storedUser);
      userEmail = storedUser?.email || "Guest";
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]); 

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );
      if (response.data.results) {
        setSearchResults(response.data.results.slice(0, 5));
        dispatch(setMovies(response.data.results));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
    }
  };

  return (
    <header className={`w-full border-2 border-amber-500 px-6 py-3 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* IMDb Logo */}
      <Link to="/" className="flex items-center">
        <img
          className="cursor-pointer transition-transform hover:scale-105 w-20 sm:w-20 md:w-24 lg:w-18 xl:w-32 h-auto border-3 border-green-500"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
          alt="IMDb Logo"
        />
      </Link>

      {/* Search Bar (Visible in tablet & larger screens) */}
      <div ref={searchRef} className="relative hidden md:flex w-[250px] h-[45px] md:[35px] sm-[35px]  lg:w-[300px] xl:w-[400px] 2xl:w-[500px] border-2 border-teal-500 rounded-lg">
        <input
          type="text"
          placeholder={t("Search Movie Here.....")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full h-[45px] px-4 pl-12 rounded-md border border-gray-600 ${
            darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-gray-200 text-black placeholder-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      {/* Navigation Links (Outside Hamburger for Desktop) */}
      <nav className="hidden lg:flex items-center gap-6 border-3 border-yellow-400 lg:gap-2 xl:gap-5">
        {[
          { name: t("popular"), path: "/movies/popular" },
          { name: t("topRated"), path: "/movies/top_rated" },
          { name: t("upcoming"), path: "/movies/upcoming" },
          { name: t("favorites"), path: "/favorites" },
          { name: t("wishlist"), path: "/wishlist" },
        ].map((item) => (
          <Link key={item.path} to={item.path} className="text-lg font-semibold hover:text-red-500 transition duration-200 xl:text-2xl 2xl:text-2xl">
            {item.name}
          </Link>
        ))}
      </nav>

      {/*  Authentication (Visible in Desktop & Laptop) */}
      <div className="hidden lg:flex items-center gap-5 border-2 border-fuchsia-500">
        {user ? (
          <>
            <span className="font-semibold hidden xl:block">Logged in as {userEmail}</span>
            <button onClick={() => dispatch(logout())} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">{t("logout")}</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">{t("login")}</Link>
            <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">{t("signup")}</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center border-2 border-amber-700">
        {isMenuOpen ? (
          <X className={`cursor-pointer ${darkMode ? "text-white" : "text-black"}`} size={28} onClick={() => setIsMenuOpen(false)} />
        ) : (
          <Menu className={`cursor-pointer ${darkMode ? "text-white" : "text-black"}`} size={28} onClick={() => setIsMenuOpen(true)} />
        )}
      </div>

      {/* Hamburger Menu (For Mobile & Tablet) */}
      {isMenuOpen && (
  <div className="absolute top-[60px] right-0 w-full bg-gray-900 text-white flex flex-col items-center gap-4 py-6 transition-all duration-300 border-2 border-blue-600 rounded-md shadow-lg">
    
    {/* ✅ Mobile & Tablet View: Show Authentication & Nav Links */}
    {screenSize < 1024 && (
      <>
        {/* ✅ Search Bar (Only in Mobile View inside Hamburger) */}
        {screenSize < 768 && (
          <div ref={searchRef} className="relative w-[80%]">
            <input 
              type="text" 
              placeholder={t("Search Movie Here.....")} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full h-[35px] px-4 pl-12 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        )}

        {/* ✅ Navigation Links Inside Hamburger Menu */}
        {["popular", "topRated", "upcoming", "favorites", "wishlist"].map((key) => (
          <Link key={key} to={`/movies/${key}`} className="text-lg">{t(key)}</Link>
        ))}

        {/* ✅ User Authentication */}
        {user ? (
          <>
            <span className="font-semibold">Logged in as {userEmail}</span>
            <button 
              onClick={() => dispatch(logout())} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              {t("login")}
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              {t("signup")}
            </Link>
          </>
        )}
      </>
    )}

    {/* ✅ Language & Dark Mode (Always Visible) */}
    <div className="flex flex-col items-center gap-3  px-6 ">
      <button 
        onClick={() => setDarkMode((prev) => !prev)} 
        className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />} Dark Mode
      </button>
      <select 
        onChange={(e) => i18n.changeLanguage(e.target.value)} 
        className="p-2 bg-gray-700 text-white rounded-md cursor-pointer"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </div>
  </div>
)}
{isMenuOpen &&   (
  <div className="absolute top-[65px] right-0 w-[10%] bg-gray-900 text-white flex flex-col items-center gap-4 py-6 transition-all duration-300 border-2 border-blue-600 rounded-md shadow-lg">
    
    {/*  Mobile & Tablet View: Show Authentication & Nav Links */}
    {screenSize < 1024 && (
      <>
        {/* ✅ Search Bar (Only in Mobile View inside Hamburger) */}
        {screenSize < 768 && (
          <div ref={searchRef} className="relative w-[80%]">
            <input 
              type="text" 
              placeholder={t("Search Movie Here.....")} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full h-[35px] px-4 pl-12 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        )}

        {/*  Navigation Links Inside Hamburger Menu */}
        {["popular", "topRated", "upcoming", "favorites", "wishlist"].map((key) => (
          <Link key={key} to={`/movies/${key}`} className="text-lg">{t(key)}</Link>
        ))}

        {/*  User Authentication */}
        {user ? (
          <>
            <span className="font-semibold">Logged in as {userEmail}</span>
            <button 
              onClick={() => dispatch(logout())} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              {t("login")}
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              {t("signup")}
            </Link>
          </>
        )}
      </>
    )}

    {/*  Language & Dark Mode (Always Visible) */}
    <div className="flex flex-col items-center gap-3 w-full px-6">
      <button 
        onClick={() => setDarkMode((prev) => !prev)} 
        className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />} Dark Mode
      </button>
      <select 
        onChange={(e) => i18n.changeLanguage(e.target.value)} 
        className="p-2 bg-gray-700 text-white rounded-md cursor-pointer"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </div>
  </div>
)}

    </header>
  );
};

export default Header;
