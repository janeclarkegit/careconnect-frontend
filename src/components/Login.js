import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

// Login page where users can access their CareConnect account
const Login = () => {
  // React hooks to manage form state
  const [email, setEmail] = useState("");           // Tracks the entered email
  const [password, setPassword] = useState("");     // Tracks the entered password
  const [error, setError] = useState("");           // Stores error messages
  const [loading, setLoading] = useState(false);    // Displays loading status during API call
  const navigate = useNavigate();                   // Used for redirecting the user post-login

  // Define the base URL depending on whether the app is running locally or deployed
  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"                     // Local development server
      : "https://careconnect-backend-k0t4.onrender.com"; // Deployed backend on Render

  // Handles login submission
  const handleLogin = async (e) => {
    e.preventDefault();           // Prevents default form submission
    setError("");                 // Clear any previous error messages
    setLoading(true);            // Show loading indicator

    try {
      // Send login credentials to backend
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      // Destructure name and role from response data
      const { name, role } = response.data;

      // Store user info in localStorage (used across pages for dynamic rendering)
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      // Navigate to the homepage on successful login
      navigate("/home");
    } catch (err) {
      // If login fails, show appropriate error
      console.error("Login failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Invalid login credentials. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading indicator regardless of outcome
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <div className="login-box">
          <h2 className="welcome-text">Welcome Back to CareConnect</h2>
          <p className="tagline">
            Login to your account to access resources and support
          </p>

          {/* Show error message if login fails */}
          {error && <div className="alert-danger">{error}</div>}

          {/* Login form */}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}  {/* Show loading state */}
            </button>
          </form>

          {/* Link to sign-up page for new users */}
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;