import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Young Carers.png"; // Logo image used in the navbar

// Navbar component that appears at the top of every page
const Navbar = () => {
  // State to control whether the mobile hamburger menu is open
  const [isMobile, setIsMobile] = useState(false);

  // Toggle the mobile menu on or off
  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  // Logout function clears stored user role and redirects to launch page
  const handleLogout = () => {
    localStorage.removeItem("role"); // Clears user role from localStorage
    window.location.href = "/";      // Redirects to the launch screen
  };

  return (
    <nav className="navbar">
      {/* Logo and site title */}
      <div className="navbar-logo">
        <img src={logo} alt="CareConnect Logo" /> 
        <Link to="/" className="navbar-link">CareConnect</Link>
      </div>

      {/* Hamburger menu for mobile view */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        {/* Three bars for menu icon */}
        <div className={isMobile ? "bar active" : "bar"}></div>
        <div className={isMobile ? "bar active" : "bar"}></div>
        <div className={isMobile ? "bar active" : "bar"}></div>
      </div>

      {/* Navigation links */}
      <ul className={isMobile ? "navbar-list active" : "navbar-list"}>
        <li className="navbar-item">
          <Link to="/home" className="navbar-link" onClick={() => setIsMobile(false)}>Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/gpt" className="navbar-link" onClick={() => setIsMobile(false)}>GPT Support</Link>
        </li>
        <li className="navbar-item">
          <Link to="/resources" className="navbar-link" onClick={() => setIsMobile(false)}>Resources</Link>
        </li>
        <li className="navbar-item">
          <Link to="/events" className="navbar-link" onClick={() => setIsMobile(false)}>Events</Link>
        </li>
        <li className="navbar-item">
          <Link to="/journal" className="navbar-link" onClick={() => setIsMobile(false)}>Journal</Link>
        </li>
        <li className="navbar-item">
          <Link to="/game" className="navbar-link" onClick={() => setIsMobile(false)}>Quiz</Link> 
        </li>
        <li className="navbar-item">
          {/* Logout button to clear session */}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;