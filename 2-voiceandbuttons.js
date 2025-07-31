// 2 - Voice and Buttons (Fixed: No Repetition, GPT Connected)

import { fetchOpenAIResponse } from "./gpt/fetch.js";
import { API_KEY } from "../apikey.js";

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const speakBtn = document.getElementById("speakBtn");

function appendMessage(content, isUser = false) {
  const message = document.createElement("div");
  message.className = isUser ? "user-message" : "bot-message";
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSend() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage(input, true);
  userInput.value = "";

  try {
    const reply = await fetchOpenAIResponse(input);
    appendMessage(reply);
    speakText(reply);
  } catch (err) {
    console.error("GPT Error:", err);
    appendMessage("❌ Something went wrong talking to GPT.");
  }
}

function speakText(text) {
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

function startListening() {
  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    handleSend();
  };

  recognition.onerror = (err) => {
    console.error("🎙️ Mic error:", err);
    appendMessage("⚠️ Mic error, try again.");
  };

  recognition.start();
}

// 🔘 Button Listeners
sendBtn?.addEventListener("click", handleSend);
speakBtn?.addEventListener("click", startListening);
userInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});
