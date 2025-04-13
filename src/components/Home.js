import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Navbar from "./Navbar"; // Import the Navbar component
import "./Home.css"; // Import your custom styles
import YoungCarersImage from "./Young Carers.png"; // Import the image

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to the journal page
  const goToJournal = () => {
    navigate("/journal");  // Adjust path according to your routing setup
  };

  // Function to navigate to the appropriate action for signed-in users
  const goToNextPage = () => {
    navigate("/journal"); // Assume that the next page for signed-in users is the journal
  };

  return (
    <div>
      <Navbar />  {/* Include the reusable Navbar */}
      <div className="body-content"> {/* Prevent content overlap with navbar */}
        <div className="home-container">

          {/* Hero Section */}
          <div className="home-hero">
            <h1>Welcome to CareConnect</h1>
            <p>Your trusted support platform for young carers.</p>
            <button className="cta-button" onClick={goToJournal}>Get Started</button>
          </div>

          {/* About the Website Section */}
          <section className="home-about">
            <h2>About CareConnect</h2>
            <div className="home-about-content">
              <div className="about-text">
                <p>
                  CareConnect is designed to provide young carers with the resources, support, and tools they need to thrive. Whether you're managing school, personal life, or caregiving responsibilities, we're here to help.
                </p>
                <p>
                  Our platform connects young carers, provides a wealth of useful resources, and offers a safe space to share experiences and advice.
                </p>
              </div>
              <div className="about-image">
                <img src={YoungCarersImage} alt="Young Carers" />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="home-how-it-works">
            <h2>How It Works</h2>
            <div className="how-it-works-content">
              <div className="how-it-works-step">
                <h3>1. Sign Up</h3>
                <p>Create a personal account and join the CareConnect community.</p>
              </div>
              <div className="how-it-works-step">
                <h3>2. Connect with Others</h3>
                <p>Engage with other young carers, share stories, and find support.</p>
              </div>
              <div className="how-it-works-step">
                <h3>3. Access Resources</h3>
                <p>Get exclusive access to helpful guides, webinars, and workshops designed to support you.</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="home-features">
            <h2>Our Key Features</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <h4>Support Network</h4>
                <p>Connect with a community of young carers to share experiences and support each other.</p>
              </div>
              <div className="feature-card">
                <h4>Resource Library</h4>
                <p>Access a wide range of resources to help manage caregiving responsibilities and maintain mental well-being.</p>
              </div>
              <div className="feature-card">
                <h4>Events & Workshops</h4>
                <p>Stay updated on upcoming events and workshops focused on young carers' personal and professional growth.</p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="home-cta">
            <h2>Join the CareConnect Community</h2>
            <p>Start your journey with CareConnect today and gain access to the support and resources you deserve.</p>
            <button className="cta-button" onClick={goToNextPage}>Go to Journal</button>
          </section>

          {/* Footer Section */}
          <footer className="home-footer">
            <p>&copy; 2025 CareConnect. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Home;