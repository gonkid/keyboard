// Matrix rain animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Call resize on load and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to use in the rain
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    
    // Font size and columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    
    // Initialize all columns to start at random positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    // Draw the matrix rain
    function draw() {
        // Set a semi-transparent black background to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set the text color and font
        ctx.fillStyle = '#33ff33'; // Matrix green
        ctx.font = fontSize + 'px monospace';
        
        // Draw each column
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            drops[i]++;
            
            // Random chance of resetting a column when it's off screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Random chance of making some characters brighter (glow effect)
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#ffffff';
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                ctx.fillStyle = '#33ff33';
            }
        }
    }

    // Run the animation
    setInterval(draw, 50);
}); 