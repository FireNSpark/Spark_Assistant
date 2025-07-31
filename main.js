// main.js - Core controller for Spark base

// Load voice + memory
import { speak } from './voice/speak.js';
import { memory } from './memory/memery.js';

// Mount basic interface
window.onload = () => {
  speak("Spark online. Voice link active.");
};
