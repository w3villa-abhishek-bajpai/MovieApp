// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setMovies } from "../../Store/Slice/movieSlice";
// import axios from "axios";
// import { Filter, X } from "lucide-react";

// const TMDB_API_KEY = "e00941df3fc0eaa106c5464b43b3f69d";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false); 
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem("selectedGenre") || "");
//   const [year, setYear] = useState(localStorage.getItem("year") || "");
//   const [rating, setRating] = useState(localStorage.getItem("rating") || "");

//   //  Fetch Genres from TMDb API
//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   const fetchGenres = async () => {
//     try {
//       const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
//       setGenres(response.data.genres);
//     } catch (error) {
//       console.error("Error fetching genres:", error);
//     }
//   };

//   //  Fetch Movies based on Filters
//   const applyFilters = async () => {
//     try {
//       const params = {
//         api_key: TMDB_API_KEY,
//         with_genres: selectedGenre || undefined,
//         primary_release_year: year || undefined,
//         "vote_average.gte": rating || undefined,
//       };

//       // Save filters in localStorage (Persistent Filters)
//       localStorage.setItem("selectedGenre", selectedGenre);
//       localStorage.setItem("year", year);
//       localStorage.setItem("rating", rating);

//       const response = await axios.get("https://api.themoviedb.org/3/discover/movie", { params });
//       dispatch(setMovies(response.data.results || []));

//       //Close Sidebar After Applying Filters
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Error fetching filtered movies:", error);
//     }
//   };

//   return (
//     <div className="relative">
//     {/*  Toggle Sidebar Button (Fixed to top-left) */}
//   {
//       !isOpen&&<button
//       onClick={() => setIsOpen(!isOpen)}
//       className="fixed top-22 left-1 z-50 p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all border border-white"
//     >
//       {isOpen ? <X size={26} /> : <Filter size={26} />}
//     </button>
//   }
  
//     {/* Sidebar Panel (Smooth Sliding) */}
//     <div
//       className={`fixed top-22  left-0 h-full w-64 max-w-[80%] bg-gray-900 text-white shadow-lg transform transition-transform ease-in-out duration-300 overflow-y-auto ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
//         <h2 className="text-lg font-semibold">Filters</h2>
//         <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
//           <X size={24} />
//         </button>
//       </div>
  
//       {/* Sidebar Content */}
//       <div className="p-6 space-y-6">
//         {/*  Genre Filter */}
//         <div>
//   <label className="block text-sm font-medium mb-2">Genre</label>
//   <select
//     value={selectedGenre}
//     onChange={(e) => setSelectedGenre(e.target.value)}
//     className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 transition"
//   >
//     {/* ✅ Predefined Genre Options */}
//     <option value="">All Genres</option>
//     <option value="28">Action</option>
//     <option value="12">Adventure</option>
//     <option value="16">Animation</option>
//     <option value="35">Comedy</option>
//     <option value="80">Crime</option>
//     <option value="99">Documentary</option>
//     <option value="18">Drama</option>
//     <option value="10751">Family</option>
//     <option value="14">Fantasy</option>
//     <option value="36">History</option>
//     <option value="27">Horror</option>
//     <option value="10402">Music</option>
//     <option value="9648">Mystery</option>
//     <option value="10749">Romance</option>
//     <option value="878">Science Fiction</option>
//     <option value="10770">TV Movie</option>
//     <option value="53">Thriller</option>
//     <option value="10752">War</option>
//     <option value="37">Western</option>

//     {/* ✅ Dynamic Genre Options from API */}
//     {genres.map((genre) => (
//       <option key={genre.id} value={genre.id}>
//         {genre.name}
//       </option>
//     ))}
//   </select>
// </div>

  
//         {/*  Release Year Filter */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Release Year</label>
//           <input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition"
//             placeholder="e.g., 2023"
//           />
//         </div>
  
//         {/*  Rating Filter */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Minimum Rating</label>
//           <input
//             type="number"
//             step="0.1"
//             min="0"
//             max="10"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition"
//             placeholder="e.g., 7.5"
//           />
//         </div>
  
//         {/* Apply Filters Button */}
//         <button
//           onClick={applyFilters}
//           className="w-full p-3 bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition text-white font-medium"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   </div>
//     );
// };

// export default Sidebar;







import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../../Store/Slice/movieSlice";
import axios from "axios";
import { Filter, X } from "lucide-react";

const TMDB_API_KEY = "e00941df3fc0eaa106c5464b43b3f69d";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem("selectedGenre") || "");
  const [year, setYear] = useState(localStorage.getItem("year") || "");
  const [rating, setRating] = useState(localStorage.getItem("rating") || "");
  const sidebarRef = useRef(null); // ✅ Reference to sidebar

  // Fetch Genres from TMDb API
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  //  Fetch Movies based on Filters
  const applyFilters = async () => {
    try {
      const params = {
        api_key: TMDB_API_KEY,
        with_genres: selectedGenre || undefined,
        primary_release_year: year || undefined,
        "vote_average.gte": rating || undefined,
      };

      // Save filters in localStorage (Persistent Filters)
      localStorage.setItem("selectedGenre", selectedGenre);
      localStorage.setItem("year", year);
      localStorage.setItem("rating", rating);

      const response = await axios.get("https://api.themoviedb.org/3/discover/movie", { params });
      dispatch(setMovies(response.data.results || []));

      // Close Sidebar After Applying Filters
      setIsOpen(false);
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
    }
  };

  // Close Sidebar When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Toggle Sidebar Button */}
      {(
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-25 left-1 z-50 p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all border border-white ${(isOpen==false)?'':'hidden'}`}
        > 
          {<Filter size={26} />}
        </button>
      )}

      {/* Sidebar Panel (with outside click close) */}
      <div
        ref={sidebarRef} // Reference to sidebar
        className={`fixed top-14 z-50  md:top-18 lg:top-16  xl:top-22 left-0 h-full w-64 max-w-[80%] bg-gray-900 text-white shadow-lg transform transition-transform ease-in-out duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 space-y-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>

              {/* Dynamic Genre Options from API */}
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Release Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., 2023"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Minimum Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., 7.5"
            />
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="w-full p-3 bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition text-white font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
