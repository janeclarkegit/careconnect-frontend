import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://careconnect-backend.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { name, role } = response.data;

      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      navigate("/resources");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid login credentials.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <div className="login-box">
          <h2 className="welcome-text">Welcome Back to CareConnect</h2>
          <p className="tagline">Login to your account to access resources and support</p>

          {error && <div className="alert-danger">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="primary-btn">Log In</button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;