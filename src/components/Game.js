import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./game.css";

// 🧠 This quiz data is separated by user role (young carer vs educator) to ensure relevance.
// Each set includes questions, options, and the correct answer.
const quizData = {
  carer: [
    {
      question: "What is a good way to practice self-care as a young carer?",
      options: ["Take short breaks", "Avoid responsibilities", "Ignore stress", "Keep working nonstop"],
      answer: "Take short breaks",
    },
    {
      question: "Who can help you at school if you feel overwhelmed?",
      options: ["A teacher", "A classmate", "The school janitor", "Ignore it"],
      answer: "A teacher",
    },
    {
      question: "What is a good coping strategy when feeling stressed?",
      options: ["Talk to a friend", "Keep it to yourself", "Skip school", "Stay up all night"],
      answer: "Talk to a friend",
    },
    {
      question: "Which organization supports young carers in Scotland?",
      options: ["Carers Trust Scotland", "Mind UK", "RSPCA", "NHS England"],
      answer: "Carers Trust Scotland",
    },
    {
      question: "What should you do if your caring role affects your schoolwork?",
      options: ["Talk to a teacher", "Ignore it", "Skip classes", "Give up on school"],
      answer: "Talk to a teacher",
    },
  ],
  teacher: [
    {
      question: "What is a sign that a student may be a young carer?",
      options: ["Frequent lateness", "Always happy", "Rarely tired", "Top grades"],
      answer: "Frequent lateness",
    },
    {
      question: "How can teachers support young carers academically?",
      options: ["Flexible deadlines", "Punish lateness", "Ignore issues", "Expect perfection"],
      answer: "Flexible deadlines",
    },
    {
      question: "What is a good way to build trust with young carers?",
      options: ["Have an open-door policy", "Ignore their needs", "Be strict at all times", "Share personal problems"],
      answer: "Have an open-door policy",
    },
    {
      question: "Which approach helps young carers manage their responsibilities?",
      options: ["Providing extra time for homework", "Reducing break times", "Adding more tasks", "Ignoring their struggles"],
      answer: "Providing extra time for homework",
    },
    {
      question: "What is the role of a designated carer liaison in school?",
      options: ["Support and advocate for young carers", "Discipline students", "Organize sports events", "Monitor attendance"],
      answer: "Support and advocate for young carers",
    },
    {
      question: "What is a common challenge young carers face in school?",
      options: ["Tiredness", "Excessive free time", "No responsibilities", "Lack of motivation"],
      answer: "Tiredness",
    },
    {
      question: "How can schools raise awareness about young carers?",
      options: ["Organize workshops", "Avoid talking about it", "Punish carers", "Exclude them from events"],
      answer: "Organize workshops",
    },
  ],
};

const QuizGame = () => {
  // Role is pulled from local storage — this means carers and teachers see different questions.
  const [role, setRole] = useState("carer");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "carer";
    setRole(storedRole);
  }, []);

  //  Handle when a user selects an answer
  const handleAnswerClick = (option) => {
    const currentQuestion = quizData[role][questionIndex];
    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! Correct answer: ${currentQuestion.answer}`);
    }
  };

  // ⏭ Proceed to next question or show the final score
  const handleNextQuestion = () => {
    setFeedback("");
    if (questionIndex + 1 < quizData[role].length) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  //  Restart the quiz from the beginning
  const restartQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-game">
      {/* Navbar for consistent navigation */}
      <div className="navbar-wrapper">
        <Navbar />
      </div>

      <div className="quiz-container">
        <h1>Educational Quiz for {role === "carer" ? "Young Carers" : "Educators"}</h1>

        {showScore ? (
          <div className="score-section">
            <h2>Your Score: {score}/{quizData[role].length}</h2>
            <p>{score === quizData[role].length ? "Excellent!" : "Keep trying, you're doing great!"}</p>
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <div className="question-section">
            <h3>Question {questionIndex + 1}/{quizData[role].length}</h3>
            <p>{quizData[role][questionIndex].question}</p>

            <div className="options">
              {quizData[role][questionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerClick(option)}>
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback shows immediately after an answer is chosen */}
            {feedback && <p className="feedback">{feedback}</p>}

            <button onClick={handleNextQuestion} className="next-btn">Next Question</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer-wrapper">
        <footer className="home-footer">
          <p>&copy; 2025 CareConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default QuizGame;