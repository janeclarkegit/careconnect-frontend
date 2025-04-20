import React from "react";
import { Link } from "react-router-dom";
import "./Launch.css"; // Custom styles for the launch/landing page

// This component serves as the welcome/entry screen for CareConnect
const Launch = () => {
  return (
    <div className="launch-container">
      
      {/* Header section introduces the platform purpose */}
      <div className="launch-header">
        <h1 className="welcome-text">Welcome to CareConnect</h1>
        <p className="tagline">A platform that supports young carers in education and self-care</p>
      </div>

      {/* Buttons navigate to login or sign-up depending on user status */}
      <div className="button-container">
        {/* Link to login page for returning users */}
        <Link to="/login">
          <button className="launch-btn">Login</button>
        </Link>

        {/* Link to sign-up page for new users */}
        <Link to="/signup">
          <button className="launch-btn signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Launch;