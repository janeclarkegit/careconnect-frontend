import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";
import { FaTrash } from "react-icons/fa"; // Import bin icon
import "./journal.css";
import Navbar from "./Navbar";

const Journal = () => {
  const sentiment = new Sentiment();

  // Load journal entries from localStorage on initial render
  const loadEntries = () => {
    const savedEntries = localStorage.getItem("journalEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  };

  const [journalEntries, setJournalEntries] = useState(loadEntries);
  const [date, setDate] = useState("");
  const [feeling, setFeeling] = useState("");
  const [entry, setEntry] = useState("");

  // Save journal entries to localStorage whenever journalEntries changes
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Analyze sentiment and return an emoji based on the score
  const analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);
    const score = result.score;

    if (score > 0) {
      return "😊 Positive";
    } else if (score < 0) {
      return "😟 Negative";
    } else {
      return "😐 Neutral";
    }
  };

  // Handle form submission to save a new journal entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (date.trim() && feeling.trim() && entry.trim()) {
      const sentimentResult = analyzeSentiment(entry);
      const newEntry = {
        date,
        feeling,
        entry,
        sentiment: sentimentResult,
      };
      const updatedEntries = [newEntry, ...journalEntries];
      setJournalEntries(updatedEntries);
      setDate("");
      setFeeling("");
      setEntry("");
    }
  };

  // Handle reset (clearing all journal entries)
  const handleReset = () => {
    setJournalEntries([]);
    localStorage.removeItem("journalEntries");
  };

  // Handle deleting an individual entry
  const handleDeleteEntry = (index) => {
    const updatedEntries = [...journalEntries];
    updatedEntries.splice(index, 1);
    setJournalEntries(updatedEntries);
  };

  return (
    <div>
      <Navbar />
      <div className="body-content">
        <div className="journal-container">
          <h2>Your Self-Care Journal</h2>

          <div className="journal-form">
            <h3>Record Your Feelings</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="feeling">How are you feeling?</label>
                <input
                  type="text"
                  id="feeling"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="e.g., Happy, Stressed, Calm"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="entry">Your Journal Entry:</label>
                <textarea
                  id="entry"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="Write about your day, your thoughts, or anything on your mind..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Save Entry</button>
            </form>
          </div>

          <button onClick={handleReset} className="reset-btn">Clear All Entries</button>

          <div className="journal-entries">
            {journalEntries.length === 0 ? (
              <p>No entries yet. Start your journal today!</p>
            ) : (
              journalEntries.map((entry, index) => (
                <div key={index} className="journal-entry">
                  <h4>{entry.date}</h4>
                  <p><strong>Feeling:</strong> {entry.feeling}</p>
                  <p>{entry.entry}</p>
                  <p><strong>Sentiment Analysis:</strong> {entry.sentiment}</p>
                  <button 
                    onClick={() => handleDeleteEntry(index)} 
                    className="delete-btn"
                    aria-label="Delete Entry"
                    title="Delete Entry"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          <footer className="home-footer">
            <p>&copy; 2025 CareConnect. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Journal;