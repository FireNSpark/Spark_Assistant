import { fetchOpenAIResponse } from "./gpt/fetch.js";
import { API_KEY } from "../apikey.js";

console.log("✅ VoiceAndButtons script loaded.");

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

  console.log("📤 Sending to GPT:", input);
  appendMessage(input, true);
  userInput.value = "";

  try {
    const reply = await fetchOpenAIResponse(input);
    console.log("📥 GPT replied:", reply);
    appendMessage(reply);
    speakText(reply);
  } catch (err) {
    console.error("❌ GPT fetch failed:", err);
    appendMessage("Error connecting to GPT.");
  }
}

function speakText(text) {
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

function startListening() {
  if (!SpeechRecognition) return alert("Speech recognition not supported");

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("🎤 Heard:", transcript);
    userInput.value = transcript;
    handleSend();
  };

  recognition.onerror = (err) => console.error("🎤 Mic error:", err);
  recognition.start();
}

sendBtn?.addEventListener("click", () => {
  console.log("📨 Send button clicked.");
  handleSend();
});
speakBtn?.addEventListener("click", () => {
  console.log("🎙️ Speak button clicked.");
  startListening();
});
userInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("⏎ ENTER key pressed.");
    handleSend();
  }
});
