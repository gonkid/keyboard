// Starburst effect at pointer location
document.addEventListener('DOMContentLoaded', function() {
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Update mouse position on mouse move
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create starburst container
    const burstContainer = document.createElement('div');
    burstContainer.className = 'burst-container';
    document.body.appendChild(burstContainer);
    
    // Function to create a starburst effect
    function createStarburst() {
        // Create starburst element
        const burst = document.createElement('div');
        burst.className = 'starburst';
        
        // Position at current mouse coordinates
        burst.style.left = mouseX + 'px';
        burst.style.top = mouseY + 'px';
        
        // Add to container
        burstContainer.appendChild(burst);
        
        // Generate random color for variety
        const hue = Math.floor(Math.random() * 360);
        const burstColor = `hsl(${hue}, 100%, 50%)`;
        burst.style.setProperty('--burst-color', burstColor);
        
        // Create rays
        const rayCount = 16; // Increased ray count
        for (let i = 0; i < rayCount; i++) {
            const ray = document.createElement('div');
            ray.className = 'ray';
            ray.style.transform = `rotate(${(i * (360 / rayCount))}deg)`;
            burst.appendChild(ray);
        }
        
        // Create particles
        createParticles(mouseX, mouseY, burstColor);
        
        // Create ring effect
        createRingEffect(mouseX, mouseY, burstColor);
        
        // Remove after animation completes
        setTimeout(() => {
            burst.classList.add('fade-out');
            setTimeout(() => {
                burstContainer.removeChild(burst);
            }, 500);
        }, 500);
    }
    
    // Function to create particles
    function createParticles(x, y, color) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Position at burst center
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Set color
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            // Random size
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random direction and speed
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            
            // Calculate end position
            const endX = x + Math.cos(angle) * speed;
            const endY = y + Math.sin(angle) * speed;
            
            // Apply animation with keyframes
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${endX - x}px), calc(-50% + ${endY - y}px))`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            // Add to container
            burstContainer.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                burstContainer.removeChild(particle);
            }, 1000);
        }
    }
    
    // Function to create ring effect
    function createRingEffect(x, y, color) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        
        // Position at burst center
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';
        
        // Set color
        ring.style.borderColor = color;
        ring.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        
        // Add to container
        burstContainer.appendChild(ring);
        
        // Remove after animation
        setTimeout(() => {
            burstContainer.removeChild(ring);
        }, 1000);
    }
    
    // Listen for key events to trigger starburst
    document.addEventListener('keydown', function(e) {
        // Only trigger on keys that play notes
        const key = e.key.toLowerCase();
        const keyElement = document.querySelector(`.key[data-key="${key}"]`);
        
        if (keyElement && !e.repeat) {
            createStarburst();
        }
    });
    
    // Also trigger on mouse clicks on keys
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('mousedown', createStarburst);
    });
}); 