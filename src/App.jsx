import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./Components/movieList/movieList";
import Movie from "./pages/home/movieDetail/movie";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Import ProtectedRoute

function App() {
  return (
    <div className=" ">
      <Router>
        <Header />
        <Routes>
          {/* ✅ Protect the Home Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="movie/:id" element={ <ProtectedRoute>
                <Movie />
              </ProtectedRoute>} />
          <Route path="movies/:type" element={ <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
