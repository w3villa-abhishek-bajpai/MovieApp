import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./Components/movieList/movieList";
import Movie from "./pages/movie/Movie"; // Import Movie Detail Page

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} /> {/* Render Movie Detail Page */}
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
