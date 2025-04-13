import React from "react";
import { Link } from "react-router-dom";
import "./Launch.css"; // Correctly linked

const Launch = () => {
  return (
    <div className="launch-container">
      <div className="launch-header">
        <h1 className="welcome-text">Welcome to CareConnect</h1>
        <p className="tagline">A platform that supports young carers in education and self-care</p>
      </div>
      <div className="button-container">
        <Link to="/login">
          <button className="launch-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="launch-btn signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Launch;