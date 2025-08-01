// main.js

// Save API Key to localStorage from input box and hide input box after saving
function saveAPIKey() {
  const inputBox = document.getElementById('apiKeyInput');
  const apiBox = document.getElementById('apikey-box');
  if (!inputBox) {
    alert('API key input not found');
    return;
  }
  const key = inputBox.value.trim();
  if (!key) {
    alert('Please enter a valid API key.');
    return;
  }
  localStorage.setItem('openai_api_key', key);
  alert('API key saved! Please refresh the page.');
  if (apiBox) {
    apiBox.style.display = 'none';  // Hide the box
  }
}

// Expose saveAPIKey globally so HTML onclick works
window.saveAPIKey = saveAPIKey;

// Add message to chat window
export function addMessage(sender, text) {
  const chatBox = document.getElementById('chat-box');
  if (!chatBox) return;
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Speak text using SpeechSynthesis API
export function speakText(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Voice toggle (example, depends on your existing voiceandbuttons.js)
export function toggleVoice(enable) {
  if (enable) {
    // Enable voice features here
  } else {
    window.speechSynthesis.cancel();
  }
}

// Other UI event listeners, input handling
document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('inputBox');
  const sendBtn = document.getElementById('sendBtn');

  if (sendBtn && inputField) {
    sendBtn.addEventListener('click', () => {
      const message = inputField.value.trim();
      if (message) {
        // Your logic to send message to Spark
        inputField.value = '';
      }
    });

    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendBtn.click();
      }
    });
  }
});
