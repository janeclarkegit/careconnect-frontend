// Import React and required modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components
import Launch from "./components/Launch"; 
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import Home from "./components/Home"; 
import Gpt from "./components/gpt";  
import Resources from "./components/resources"; 
import Events from "./components/events";
import Journal from "./components/journal";  // Correctly reference the lowercase 'journal'
import Game from "./components/Game";  // Import the Memory Game

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gpt" element={<Gpt />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/journal" element={<Journal />} />  {/* Corrected Journal route */}
        <Route path="/game" element={<Game />} />  {/* Memory Game route */}
      </Routes>
    </Router>
  );
}

export default App;