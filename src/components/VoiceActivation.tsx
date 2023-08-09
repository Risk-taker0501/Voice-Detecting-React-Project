import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceActivation: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [previousTranscriptLength, setPreviousTranscriptLength] = useState<number>(0);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (isRecording) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isRecording, resetTranscript]);

  React.useEffect(() => {
    if (transcript.length > 0 && transcript.length !== previousTranscriptLength) {
      // User is speaking
      setIsSpeaking(true);
      console.log("User is speaking.");
    } else {
      // User has paused speaking
      setIsSpeaking(false);
      console.log("User is not speaking.");
    }
    setPreviousTranscriptLength(transcript.length);
  }, [previousTranscriptLength, transcript]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={handleStopRecording} disabled={!isRecording}>Stop Recording</button>
      <p>{ !isSpeaking ? "User is not speaking." : transcript}</p>
    </div>
  );
};

export default VoiceActivation;
