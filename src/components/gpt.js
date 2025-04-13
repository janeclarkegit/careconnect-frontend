import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./gpt.css";

const Gpt = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const motivationalQuotes = {
    happy: "✨ Believe you can and you're halfway there. ✨",
    neutral: "💡 The only way to do great work is to love what you do. 💡",
    sad: "🌟 You are never too old to set another goal or to dream a new dream. 🌟",
    stressed: "💪 Success is not final, failure is not fatal: It is the courage to continue that counts. 💪",
  };

  const handleUserInput = (e) => setUserInput(e.target.value);

  const getRandomQuote = () => {
    return selectedEmotion
      ? motivationalQuotes[selectedEmotion]
      : "🌍 Select an emotion for a special quote!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const input = userInput;
    setChatHistory((prev) => [...prev, { user: input, bot: "...", mood: selectedEmotion || "neutral" }]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://careconnect-backend.onrender.com/chat", {
        message: input,
      });

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

  const handleSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => console.log("Voice recognition started...");
    recognition.onresult = (event) => setUserInput(event.results[0][0].transcript);
    recognition.start();
  };

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  return (
    <div className="gpt-container">
      <Navbar />
      <div className="phone-screen">
        <h1 className="chat-title">CareConnect Chat</h1>

        <div className="emotion-selection">
          <button onClick={() => handleEmotionClick("happy")} className="emotion-btn">😊</button>
          <button onClick={() => handleEmotionClick("neutral")} className="emotion-btn">😐</button>
          <button onClick={() => handleEmotionClick("sad")} className="emotion-btn">😔</button>
          <button onClick={() => handleEmotionClick("stressed")} className="emotion-btn">😟</button>
        </div>

        <div className="quote-section">
          <p>{getRandomQuote()}</p>
        </div>

        <div className="chat-container">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-bubble">
              <strong>You:</strong> {chat.user}
              <br />
              <strong>Bot:</strong> {chat.bot}
              <button onClick={() => handleSpeech(chat.bot)} className="speech-btn">🗣️</button>
            </div>
          ))}
          {loading && <div className="loading">Bot is thinking...</div>}
        </div>

        <form onSubmit={handleSubmit} className="gpt-form">
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Ask a question..."
              className="gpt-input"
            />
            <button type="button" onClick={startVoiceRecognition} className="mic-btn">🎤</button>
          </div>
          <button type="submit" className="gpt-submit-btn">Send</button>
        </form>
      </div>

      <footer className="home-footer">
        <p>&copy; 2025 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Gpt;