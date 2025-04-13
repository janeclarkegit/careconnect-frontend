const startSpeechToText = (setUserInput) => {
    const recognition = new window.SpeechRecognition() || new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      console.log("Speech recognition started...");
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript); // Set the transcript into the input field
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  
    recognition.start();
  };