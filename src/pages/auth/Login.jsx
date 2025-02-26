// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../Store/Slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode"; 

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   // Redirect if already logged in
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (storedUser) {
//       dispatch(login(storedUser)); // Restore session
//       navigate("/");
//     }
//   }, [user, navigate, dispatch]);

//   //  Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Login with Email & Password
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     // Mock Database (LocalStorage)
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const foundUser = users.find(
//       (user) => user.email === formData.email && user.password === formData.password
//     );

//     if (foundUser) {
//       dispatch(login(foundUser)); // Save to Redux
//       localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // Save session
//       navigate("/");
//     } else {
//       setError("Invalid email or password!");
//     }
//   };

//   // ✅ Handle Google Login Success
//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     const decodedUser = jwtDecode(credentialResponse.credential); // Decode JWT
//     console.log("Google User:", decodedUser);

//     const googleUser = {
//       name: decodedUser.name,
//       email: decodedUser.email,
//       picture: decodedUser.picture || "https://via.placeholder.com/100", // Fallback Avatar
//     };

//     dispatch(login(googleUser)); // Store in Redux
//     localStorage.setItem("loggedInUser", JSON.stringify(googleUser)); // Save session
//     navigate("/"); // Redirect
//   };

//   // ✅ Handle Google Login Failure
//   const handleGoogleLoginFailure = () => {
//     console.log("Google Login Failed");
//   };

//   return (
//     <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-900 text-gray-900">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
//         {/* Logo */}
//         <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Login</h2>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <p className="px-3 text-sm text-gray-500">OR</p>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>

//         {/* ✅ Google Login Button */}
//         <div className="flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleLoginSuccess}
//             onError={handleGoogleLoginFailure}
//           />
//         </div>

//         {/* Signup Link */}
//         <p className="text-center text-sm mt-4">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-500 font-semibold cursor-pointer hover:underline"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Store/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state for Google Login

  // ✅ Restore session from Local Storage (Runs Only Once)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && !user) {
      dispatch(login(storedUser));
      navigate("/");
    }
  }, [dispatch, navigate, user]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Email & Password Login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      dispatch(login(foundUser));
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/");
    } else {
      setError("Invalid email or password!");
    }
  };

  //  Handle Google Login Success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      console.error("Google Login Failed: No Credential Found");
      setError("Google Login Failed. Please try again.");
      return;
    }

    setLoading(true); //  Show loading state

    try {
      const decodedUser = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decodedUser);

      if (!decodedUser || !decodedUser.email) {
        console.error("Invalid Google Token: No Email Found");
        setError("Google login failed. Email not found.");
        return;
      }

      const googleUser = {
        name: decodedUser.name || "User",
        email: decodedUser.email,
        picture: decodedUser.picture || "https://via.placeholder.com/100",
      };

      dispatch(login(googleUser));
      localStorage.setItem("loggedInUser", JSON.stringify(googleUser));
      navigate("/");
    } catch (error) {
      console.error("Invalid JWT Token:", error.message);
      setError("Google authentication failed. Try again.");
    } finally {
      setLoading(false); //Hide loading state
    }
  };

  //  Handle Google Login Failure
  const handleGoogleLoginFailure = () => {
    console.log("Google Login Failed");
    setError("Google authentication failed. Please try again.");
  };

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen bg-gray-900 text-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Email & Password Login */}
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

          <button type="submit" className="w-full p-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition">
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/*  Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
        </div>

        {/* Show Loading Indicator */}
        {loading && <p className="text-center text-sm text-blue-600 mt-2">Processing Google Login...</p>}

        {/* Signup Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
