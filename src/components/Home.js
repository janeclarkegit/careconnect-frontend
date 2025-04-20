import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Home.css";
import YoungCarersImage from "./Young Carers.png";

const Home = () => {
  const navigate = useNavigate();

  // Navigates to the journal – this is a key emotional support feature for users
  const goToJournal = () => {
    navigate("/journal");
  };

  // Alternative function used for the second CTA – provides flexibility in naming
  const goToNextPage = () => {
    navigate("/journal");
  };

  return (
    <div>
      {/* Navbar component provides consistent navigation across the app */}
      <Navbar />
      <div className="body-content">
        <div className="home-container">

          {/* Welcome section with a friendly tone – designed to reduce anxiety and offer reassurance */}
          <div className="home-hero">
            <h1>Welcome to CareConnect</h1>
            <p>Your digital space for practical tools and emotional support.</p>
            <button className="cta-button" onClick={goToJournal}>Get Started</button>
          </div>

          {/* About section gives a brief, easy-to-understand summary of the platform's purpose */}
          <section className="home-about">
            <h2>About CareConnect</h2>
            <div className="home-about-content">
              <div className="about-text">
                <p>
                  CareConnect is designed to support young carers and educators by offering helpful resources, emotional well-being tools, and easy access to local services. Whether you're managing studies, caregiving duties, or need a moment to reflect — CareConnect is here to help.
                </p>
                <p>
                  The platform features personalised tools depending on your role, including a motivational chatbot, emotional journal, and localised events based on your area in the UK.
                </p>
              </div>
              {/* Image included to create a welcoming and relatable visual for users */}
              <div className="about-image">
                <img src={YoungCarersImage} alt="Young Carers" />
              </div>
            </div>
          </section>

          {/* This section breaks the process down into simple steps to reduce cognitive load */}
          <section className="home-how-it-works">
            <h2>How It Works</h2>
            <div className="how-it-works-content">
              <div className="how-it-works-step">
                <h3>1. Sign Up</h3>
                <p>Create an account and select your role — young carer or educator.</p>
              </div>
              <div className="how-it-works-step">
                <h3>2. Explore Resources</h3>
                <p>Access tailored information, tools, and local services relevant to your needs and region.</p>
              </div>
              <div className="how-it-works-step">
                <h3>3. Get Support</h3>
                <p>Use the motivational chatbot, reflect in your private journal, and discover what's available near you.</p>
              </div>
            </div>
          </section>

          {/* Core features are listed in visual cards to improve scannability and user understanding */}
          <section className="home-features">
            <h2>Key Features</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <h4>Role-Specific Resources</h4>
                <p>Access curated content and guidance depending on whether you're a carer or an educator.</p>
              </div>
              <div className="feature-card">
                <h4>Motivational Chatbot</h4>
                <p>Get friendly, AI-powered encouragement and advice based on what you're feeling.</p>
              </div>
              <div className="feature-card">
                <h4>Journal Space</h4>
                <p>Privately track your emotions and reflect on your day with our easy-to-use journal feature.</p>
              </div>
              <div className="feature-card">
                <h4>Local Events</h4>
                <p>Find support groups, free meals, or school events in your area using postcode-based search.</p>
              </div>
            </div>
          </section>

          {/* Final call-to-action encourages users to engage further once they've explored the content */}
          <section className="home-cta">
            <h2>Ready to explore?</h2>
            <p>CareConnect is here to make things a little easier. Log in to get started on your journey.</p>
            <button className="cta-button" onClick={goToNextPage}>Open My Journal</button>
          </section>

          {/* Footer  */}
          <footer className="home-footer">
            <p>&copy; 2025 CareConnect. Built for young carers and educators across the UK.</p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Home;