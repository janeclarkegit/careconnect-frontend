import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  // Function to convert text to speech
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set language to English
    speech.rate = 1; // Set rate of speech (1 is normal)
    speech.pitch = 1; // Set pitch of speech (1 is normal)
    speech.volume = 1; // Set volume (1 is max)

    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h2>Text to Speech</h2>
      
      {/* Input for the user to enter text */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak"
        rows="4"
        cols="50"
      />

      {/* Button to trigger TTS */}
      <button onClick={() => speakText(text)}>Speak</button>
    </div>
  );
};

export default TextToSpeech;