import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // **Check credentials from localStorage (mock database)**
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      dispatch(login(user.email));
      navigate("/");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-900 text-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        {/* Logo (Instagram-like styling) */}
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Login</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Login Button (Smaller & Styled like Instagram) */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
