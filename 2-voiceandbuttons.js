// 2 - Voice and Buttons (Hooks to GPT with Debug Logging)

import { fetchOpenAIResponse } from "./gpt/fetch.js"; import { API_KEY } from "../apikey.js";

const synth = window.speechSynthesis; const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const chatBox = document.getElementById("chatBox"); const userInput = document.getElementById("userInput"); const sendBtn = document.getElementById("sendBtn"); const speakBtn = document.getElementById("speakBtn");

function appendMessage(content, isUser = false) { const message = document.createElement("div"); message.className = isUser ? "user-message" : "bot-message"; message.textContent = content; chatBox.appendChild(message); chatBox.scrollTop = chatBox.scrollHeight; }

async function handleSend() { const input = userInput.value.trim(); if (!input) return;

appendMessage(input, true); userInput.value = "";

console.log("Sending to GPT:", input); try { const reply = await fetchOpenAIResponse(input); console.log("Reply from GPT:", reply); appendMessage(reply); speakText(reply); } catch (err) { console.error("Error fetching GPT reply:", err); appendMessage("[Error getting response]"); } }

function speakText(text) { if (!synth) return; const utter = new SpeechSynthesisUtterance(text); synth.speak(utter); }

function startListening() { if (!SpeechRecognition) return alert("Speech recognition not supported");

const recognition = new SpeechRecognition(); recognition.lang = "en-US"; recognition.interimResults = false;

recognition.onresult = async (event) => { const transcript = event.results[0][0].transcript; console.log("Voice input:", transcript); userInput.value = transcript; handleSend(); };

recognition.onerror = (err) => console.error("Speech error:", err); recognition.start(); }

sendBtn?.addEventListener("click", handleSend); speakBtn?.addEventListener("click", startListening); userInput?.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });

