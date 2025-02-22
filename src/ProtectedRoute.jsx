import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  // ✅ Redirects to login page if the user is not logged in
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
