// Function to start speech-to-text using the Web Speech API
const startSpeechToText = (setUserInput) => {
  // Use built-in SpeechRecognition or fallback for certain browsers
  const recognition = new window.SpeechRecognition() || new window.webkitSpeechRecognition();

  // Configure the recognition settings
  recognition.continuous = false;        // Stop automatically after a short pause
  recognition.lang = "en-US";            // Set the language to English (United States)
  recognition.interimResults = false;    // Only return final results, not partial ones

  // Log when recognition starts
  recognition.onstart = () => {
    console.log("Speech recognition started...");
  };

  // When speech is successfully captured, update the input field with the transcript
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserInput(transcript); // Pass transcript to state updater (e.g., for chatbot input)
  };

  // Handle any errors during recognition
  recognition.onerror = (event) => {
    console.error("Speech recognition error: ", event.error);
  };

  // Log when recognition ends (even if successful)
  recognition.onend = () => {
    console.log("Speech recognition ended.");
  };

  // Start listening
  recognition.start();
};