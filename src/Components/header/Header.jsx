import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="mx-10 w-screen h-[60px] px-10 py-3 flex items-center justify-between bg-gray-900 shadow-md">
      <div className="flex h-full items-center justify-evenly gap-10 w-[40%] border-2 border-red-800">  
        {/* IMDb Logo */}
        <Link to="/">
          <img 
            className="w-20 h-full cursor-pointer"  
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" 
            alt="IMDb Logo" 
          />
        </Link>

        {/* Navigation Links */}
        <Link to="/movies/popular" style={{ textDecoration: "none" }} className="text-lg text-white hover:text-red-500 transition-all font-bold ">
          <span className='text-3xl h-full'>Popular</span>
        </Link>

        <Link to="/movies/top_rated" style={{ textDecoration: "none" }} className="text-lg text-white hover:text-red-500 transition-all font-bold ">
          <span className='text-3xl h-full'>Top Rated</span>
        </Link>

        <Link to="/movies/upcoming" style={{ textDecoration: "none" }} className="text-lg text-white hover:text-red-500 transition-all font-bold ">
          <span className='text-3xl h-full'>Upcoming</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
