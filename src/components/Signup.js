import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

// Signup component allows users to register and select a role (carer or teacher)
const Signup = () => {
  // Local state hooks to track form inputs and user status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This checks if the app is running locally or on Render and switches the API endpoint accordingly
  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://careconnect-backend-k0t4.onrender.com";

  // Handles form submission and account creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true); // Show loading state

    // Prevent form submission if user didn’t choose a role
    if (!role) {
      setError("Please select a role (Young Carer or Educator).");
      setLoading(false);
      return;
    }

    try {
      // Make POST request to backend to create a new user
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
        role,
      });

      console.log("✅ Signup success:", response.data);

      // Inform the user and redirect to login
      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      // Log any errors and display message
      console.error("❌ Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="welcome-text">Join CareConnect</h2>

          {/* Display any errors to the user */}
          {error && <div className="alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name input */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password input */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Role selection: user must choose one to continue */}
            <label>I am a:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="carer"
                  checked={role === "carer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Young Carer
              </label>
              <label>
                <input
                  type="radio"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Educator
              </label>
            </div>

            {/* Submit button, shows loading message when waiting on server */}
            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Link for users who already have an account */}
          <p className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;