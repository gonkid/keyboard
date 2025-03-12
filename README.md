# Matrix Keyboard Synth

A browser-based synthesizer with a Matrix-inspired theme that you can play using your computer keyboard.

## Features

- Play musical notes using your computer keyboard
- Visual keyboard interface with red keys
- Matrix-style digital rain animation in the background
- Adjustable synthesizer parameters:
  - Waveform selection (sine, square, sawtooth, triangle)
  - Volume control
  - Attack time (how quickly a note reaches full volume)
  - Release time (how quickly a note fades out)
- Responsive design that works on different screen sizes

## How to Use

1. Open `index.html` in a web browser
2. Click anywhere on the page to initialize audio (browsers require user interaction to start audio)
3. Use your computer keyboard to play notes:
   - Keys A, S, D, F, G, H, J, K correspond to white keys (C4, D4, E4, F4, G4, A4, B4, C5)
   - Keys W, E, T, Y, U correspond to black keys (C#4, D#4, F#4, G#4, A#4)
4. Adjust the controls to change the sound characteristics

## Technical Details

This project uses the Web Audio API to generate sounds directly in the browser. No external libraries or dependencies are required.

## Browser Compatibility

This synth works in modern browsers that support the Web Audio API, including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available for anyone to use and modify.

## Future Improvements

Potential enhancements for future versions:
- Add more octaves
- Include additional sound parameters (filter, reverb, etc.)
- MIDI controller support
- Ability to record and save performances

## Visual Theme

The app features:
- Matrix-inspired digital rain animation in the background
- Red keyboard keys (lighter red for white keys, darker red for black keys)
- Green Matrix-style text and UI elements
- Glowing effects when keys are pressed 