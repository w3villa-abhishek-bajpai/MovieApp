import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./Components/movieList/movieList";
import Movie from "./pages/home/movieDetail/movie";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          
          {/* ✅ Add Login & Signup Routes */}
          <Route path="/login" element={<Login isSignup={false} />} />
          <Route path="/signup" element={<Signup isSignup={true} />} />
          
          <Route path="*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
