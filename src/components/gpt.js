import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./gpt.css";

const Gpt = () => {
  // ⌨️ User input field state
  const [userInput, setUserInput] = useState("");

  // Chat log state for displaying full conversation history
  const [chatHistory, setChatHistory] = useState([]);

  //  Loading state to show users when the bot is thinking
  const [loading, setLoading] = useState(false);

  //  Emotional context selected by the user
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  //  Simple motivational quotes mapped to emotional states
  const motivationalQuotes = {
    happy: "✨ Believe you can and you're halfway there. ✨",
    neutral: "💡 The only way to do great work is to love what you do. 💡",
    sad: "🌟 You are never too old to set another goal or to dream a new dream. 🌟",
    stressed: "💪 Success is not final, failure is not fatal: It is the courage to continue that counts. 💪",
  };

  // Handle text input updates
  const handleUserInput = (e) => setUserInput(e.target.value);

  //  Shows motivational quote based on selected emotion
  const getRandomQuote = () => {
    return selectedEmotion
      ? motivationalQuotes[selectedEmotion]
      : "🌍 Select an emotion for a special quote!";
  };

  //  Main function to handle chat submission and call the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const input = userInput;

    // Temporarily add "..." to indicate the bot is generating a response
    setChatHistory((prev) => [
      ...prev,
      { user: input, bot: "...", mood: selectedEmotion || "neutral" },
    ]);

    setUserInput("");
    setLoading(true);

    try {
      //  Dynamically set base URL depending on dev or deployed
      const baseURL =
        window.location.hostname === "localhost"
          ? "http://localhost:3001"
          : "https://careconnect-backend-k0t4.onrender.com";

      // Send user message to backend API
      const response = await axios.post(`${baseURL}/chat`, {
        message: input,
      });

      // Replace "..." with actual response
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        {
          user: input,
          bot: response.data.botMessage || "🤖 Sorry, I didn't understand that.",
          mood: selectedEmotion || "neutral",
        },
      ]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      // Show error message in chat
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        {
          user: input,
          bot: "⚠️ Error: Unable to fetch response.",
          mood: selectedEmotion || "neutral",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  //  Read chatbot messages aloud using browser’s speechSynthesis API
  const handleSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  //  Voice input using browser speech recognition
  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.onstart = () => console.log("Voice recognition started...");
    recognition.onresult = (event) =>
      setUserInput(event.results[0][0].transcript);

    recognition.start();
  };

  //  Emotion selector changes quote and informs chatbot tone
  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  return (
    <div className="gpt-container">
      <Navbar />

      <div className="phone-screen">
        <h1 className="chat-title">CareConnect Chat</h1>

        {/*  Emotion buttons update quote and user context */}
        <div className="emotion-selection">
          <button onClick={() => handleEmotionClick("happy")} className="emotion-btn">😊</button>
          <button onClick={() => handleEmotionClick("neutral")} className="emotion-btn">😐</button>
          <button onClick={() => handleEmotionClick("sad")} className="emotion-btn">😔</button>
          <button onClick={() => handleEmotionClick("stressed")} className="emotion-btn">😟</button>
        </div>

        <div className="quote-section">
          <p>{getRandomQuote()}</p>
        </div>

        {/*  Display full conversation with speech button */}
        <div className="chat-container">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-bubble">
              <strong>You:</strong> {chat.user}
              <br />
              <strong>Bot:</strong> {chat.bot}
              <button
                onClick={() => handleSpeech(chat.bot)}
                className="speech-btn"
              >
                🗣️
              </button>
            </div>
          ))}
          {loading && <div className="loading">Bot is thinking...</div>}
        </div>

        {/*  Chat input with voice recognition button */}
        <form onSubmit={handleSubmit} className="gpt-form">
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Ask a question..."
              className="gpt-input"
            />
            <button
              type="button"
              onClick={startVoiceRecognition}
              className="mic-btn"
            >
              🎤
            </button>
          </div>
          <button type="submit" className="gpt-submit-btn">
            Send
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Gpt;