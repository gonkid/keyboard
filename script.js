// Initialize the audio context
let audioContext;
// Store active notes
const activeNotes = new Map();

// Frequency mapping for musical notes
const noteFrequencies = {
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392.00,
    'G#4': 415.30,
    'A4': 440.00,
    'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25
};

// Initialize the audio context when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio context on user interaction to comply with browser policies
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
    
    // Set up event listeners for keyboard and UI controls
    setupEventListeners();
});

// Initialize the audio context
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context initialized');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Mouse events for clicking on keys
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('mousedown', () => playNote(key.dataset.note));
        key.addEventListener('mouseup', () => stopNote(key.dataset.note));
        key.addEventListener('mouseleave', () => {
            if (key.classList.contains('active')) {
                stopNote(key.dataset.note);
            }
        });
    });
    
    // Control changes
    document.getElementById('waveform').addEventListener('change', updateSynthSettings);
    document.getElementById('volume').addEventListener('input', updateSynthSettings);
    document.getElementById('attack').addEventListener('input', updateSynthSettings);
    document.getElementById('release').addEventListener('input', updateSynthSettings);
}

// Handle key down events
function handleKeyDown(e) {
    if (e.repeat) return; // Prevent key repeat
    
    const key = e.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    
    if (keyElement) {
        const note = keyElement.dataset.note;
        playNote(note);
    }
}

// Handle key up events
function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    
    if (keyElement) {
        const note = keyElement.dataset.note;
        stopNote(note);
    }
}

// Play a note
function playNote(note) {
    if (!audioContext) initAudio();
    
    // If note is already playing, stop it first
    if (activeNotes.has(note)) {
        stopNote(note);
    }
    
    // Get the frequency for the note
    const frequency = noteFrequencies[note];
    
    // Get synth settings from UI
    const waveform = document.getElementById('waveform').value;
    const volume = parseFloat(document.getElementById('volume').value);
    const attack = parseFloat(document.getElementById('attack').value);
    const release = parseFloat(document.getElementById('release').value);
    
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Create gain node for volume control and envelope
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + attack);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start oscillator
    oscillator.start();
    
    // Store the active note
    activeNotes.set(note, { oscillator, gainNode });
    
    // Add active class to the key
    const keyElement = document.querySelector(`.key[data-note="${note}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
    }
}

// Stop a note
function stopNote(note) {
    if (activeNotes.has(note)) {
        const { oscillator, gainNode } = activeNotes.get(note);
        const release = parseFloat(document.getElementById('release').value);
        
        // Apply release envelope
        const now = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + release);
        
        // Stop oscillator after release
        oscillator.stop(now + release + 0.01);
        
        // Remove active class from the key
        const keyElement = document.querySelector(`.key[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
        
        // Remove from active notes after release
        setTimeout(() => {
            activeNotes.delete(note);
        }, release * 1000 + 100);
    }
}

// Update synth settings
function updateSynthSettings() {
    // This function is called when controls are changed
    // We don't need to do anything here as the settings are read when notes are played
    console.log('Synth settings updated');
} 