import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Young Carers.png"; 

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="CareConnect Logo" />
        <Link to="/" className="navbar-link">CareConnect</Link>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={isMobile ? "bar active" : "bar"}></div>
        <div className={isMobile ? "bar active" : "bar"}></div>
        <div className={isMobile ? "bar active" : "bar"}></div>
      </div>

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
          <Link to="/game" className="navbar-link" onClick={() => setIsMobile(false)}>Quiz</Link> {/* New Memory Game Link */}
        </li>
        <li className="navbar-item">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;