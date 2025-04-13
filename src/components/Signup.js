import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dynamic base URL depending on local or deployed environment
  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://careconnect-backend.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select a role (Young Carer or Educator).");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
        role,
      });

      console.log("Response from server:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="welcome-text">Join CareConnect</h2>
          {error && <div className="alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;