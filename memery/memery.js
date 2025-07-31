// speak.js - Handles voice output with fallback

const synth = window.speechSynthesis;

export function speak(text, opts = {}) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts.lang || 'en-US';
  utter.pitch = opts.pitch || 1;
  utter.rate = opts.rate || 1;
  utter.volume = opts.volume || 1;
  utter.voice = synth.getVoices().find(v => v.name.includes('Google') || v.default);

  synth.cancel(); // clear queue
  synth.speak(utter);
}
