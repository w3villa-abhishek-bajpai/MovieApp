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
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
          />
          <button type="submit" className="p-3 bg-blue-600 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;