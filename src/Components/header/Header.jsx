import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slice/authSlice";
import { Menu, X } from "lucide-react";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full h-[80px] px-6 flex items-center justify-between bg-gray-900 shadow-md">
      {/* Left Section - IMDb Logo */}
      <div className="h-full flex items-center">
        <Link to="/">
          <img
            className="w-20 h-auto cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDb Logo"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8 h-full">
        <Link to="/movies/popular" className="text-lg text-white hover:text-red-500 transition">Popular</Link>
        <Link to="/movies/top_rated" className="text-lg text-white hover:text-red-500 transition">Top Rated</Link>
        <Link to="/movies/upcoming" className="text-lg text-white hover:text-red-500 transition">Upcoming</Link>
      </div>

      {/* Auth Buttons */}
      <div className="hidden lg:flex gap-4 h-full">
        {user ? (
          <>
            <span className="text-white font-semibold">Welcome, {user}</span>
            <button
              onClick={() => dispatch(logout())}
              className="w-[130px] h-[45px] flex items-center justify-center bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="w-[130px] h-[45px] flex items-center justify-center bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition">
              Login
            </Link>
            <Link to="/signup" className="w-[130px] h-[45px] flex items-center justify-center bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="lg:hidden flex items-center">
        {isMenuOpen ? (
          <X className="text-white cursor-pointer" size={30} onClick={() => setIsMenuOpen(false)} />
        ) : (
          <Menu className="text-white cursor-pointer" size={30} onClick={() => setIsMenuOpen(true)} />
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-[80px] left-0 w-full bg-gray-900 flex flex-col items-center gap-6 py-6 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}>
        <Link to="/movies/popular" className="text-lg text-white hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Popular</Link>
        <Link to="/movies/top_rated" className="text-lg text-white hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Top Rated</Link>
        <Link to="/movies/upcoming" className="text-lg text-white hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Upcoming</Link>

        {user ? (
          <>
            <span className="text-white font-semibold">Welcome, {user}</span>
            <button
              onClick={() => { dispatch(logout()); setIsMenuOpen(false); }}
              className="w-[130px] h-[45px] flex items-center justify-center bg-red-600 text-white text-lg rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="w-[130px] h-[45px] flex items-center justify-center bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="w-[130px] h-[45px] flex items-center justify-center bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
