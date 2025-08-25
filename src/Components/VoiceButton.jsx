// src/Components/VoiceButton.jsx
import React, { useContext } from "react";
import { Context } from "../context/Context.jsx";

export default function VoiceButton() {
  const { startListening, isListening } = useContext(Context);

  return (
    <button
      onClick={startListening}
      style={{
        padding: "8px 16px",
        borderRadius: "9999px",
        border: "none",
        background: isListening ? "#ff3838ff" : "#2563EB", // red when listening
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {isListening ? "🎙️ Listening..." : "🎤 Speak"}
    </button>
  );
}
