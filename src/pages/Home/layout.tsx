import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define types for our elements
interface Polygon {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: number[];
  mass: number;
}

interface Letter {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  color: string;
  mass: number;
  inPlace: boolean;
  hitTime?: number; // Track when the letter was last hit for glow effect
}

interface Ship {
  x: number;
  y: number;
  rotation: number;
  thrusting: boolean;
  vx: number;
  vy: number;
}

// Main component
const AsteroidsNameFormation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shipVisible, setShipVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    setIsLoaded(true);
    
    // Show ship after delay
    const timeout = setTimeout(() => {
      setShipVisible(true);
      
      // Show buttons after name forms
      setTimeout(() => {
        setButtonsVisible(true);
      }, 4000);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Adjust canvas size to match window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create name text
    const nameText = "ALAN CAMPBELL";
    const subtitleText = "STAFF ENGINEER";
    let letters: Letter[] = [];
    let polygons: Polygon[] = [];
    
    const createLetters = () => {
      letters = [];
      const fontSize = Math.min(60, Math.max(30, canvas.width / 20)); // Responsive font size
      
      // Calculate total width of the name
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      const nameWidth = ctx.measureText(nameText).width;
      const subtitleWidth = ctx.measureText(subtitleText).width * 0.8; // Smaller font
      
      // Calculate starting positions
      const startX = (canvas.width - nameWidth) / 2;
      const nameY = canvas.height / 2 - fontSize;
      const subtitleY = canvas.height / 2 + fontSize * 0.8;
      
      // Create letters for name
      for (let i = 0; i < nameText.length; i++) {
        const char = nameText[i];
        const charWidth = ctx.measureText(char).width;
        
        // Calculate target position
        const targetX = startX + ctx.measureText(nameText.substring(0, i)).width + charWidth / 2;
        
        // Create letter at random starting position
        letters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX,
          targetY: nameY,
          vx: 0,
          vy: 0,
          char,
          size: fontSize,
          color: '#ffffff',
          mass: 10,
          inPlace: false
        });
      }
      
      // Create letters for subtitle
      const subtitleStartX = (canvas.width - subtitleWidth) / 2;
      for (let i = 0; i < subtitleText.length; i++) {
        const char = subtitleText[i];
        const charWidth = ctx.measureText(char).width * 0.8; // Smaller font
        
        // Calculate target position
        const targetX = subtitleStartX + ctx.measureText(subtitleText.substring(0, i)).width * 0.8 + charWidth / 2;
        
        // Create letter at random starting position
        letters.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100, // Start below screen
          targetX,
          targetY: subtitleY,
          vx: 0,
          vy: 0,
          char,
          size: fontSize * 0.8, // Smaller font for subtitle
          color: '#4dabf7', // Blue color
          mass: 5,
          inPlace: false
        });
      }
    };
    
    // Create polygons
    const createPolygons = () => {
      polygons = [];
      const numPolygons = Math.min(25, Math.floor(canvas.width / 70)); // Adjust number based on screen size
      
      for (let i = 0; i < numPolygons; i++) {
        // Random position
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Create a random polygon shape
        const numVertices = Math.floor(Math.random() * 4) + 5; // 5-8 vertices
        const shape = [];
        const baseSize = Math.random() * 0.4 + 0.6; // Size variation factor
        
        for (let j = 0; j < numVertices; j++) {
          const angle = j * 2 * Math.PI / numVertices;
          const radius = baseSize * (0.8 + Math.random() * 0.4); // Add randomness to the radius
          shape.push(radius);
        }
        
        const size = Math.random() * 30 + 20; // Size between 20 and 50
        
        const polygon: Polygon = {
          x,
          y,
          size,
          vx: (Math.random() - 0.5) * 2, // Velocity between -1 and 1
          vy: (Math.random() - 0.5) * 2,
          rotation: Math.random() * Math.PI * 2, // Random initial rotation
          rotationSpeed: (Math.random() - 0.5) * 0.03, // Rotation speed
          color: `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${220 + Math.random() * 35}, 0.7)`,
          shape,
          mass: size * size * 0.01 // Mass based on size
        };
        
        polygons.push(polygon);
      }
    };
    
    // Create ship
    const ship: Ship = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      rotation: -Math.PI / 2, // Point upward initially
      thrusting: false,
      vx: 0,
      vy: 0
    };
    
    createLetters();
    createPolygons();
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0c1222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw starfield background
      drawStars(ctx, canvas);
      
      // Update and draw polygons
      polygons.forEach(polygon => {
        // Move polygon
        polygon.x += polygon.vx;
        polygon.y += polygon.vy;
        polygon.rotation += polygon.rotationSpeed;
        
        // Wrap around screen edges
        if (polygon.x < -polygon.size) polygon.x = canvas.width + polygon.size;
        if (polygon.x > canvas.width + polygon.size) polygon.x = -polygon.size;
        if (polygon.y < -polygon.size) polygon.y = canvas.height + polygon.size;
        if (polygon.y > canvas.height + polygon.size) polygon.y = -polygon.size;
        
        // Check collision with letters
        letters.forEach(letter => {
          const dx = letter.x - polygon.x;
          const dy = letter.y - polygon.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = letter.size / 2 + polygon.size;
          
          if (distance < minDistance) {
            // Calculate collision response
            const angle = Math.atan2(dy, dx);
            const overlap = minDistance - distance;
            
            // Move objects apart
            const moveX = Math.cos(angle) * overlap * 0.5;
            const moveY = Math.sin(angle) * overlap * 0.5;
            
            // Apply movement based on mass
            const massRatio1 = polygon.mass / (polygon.mass + letter.mass);
            const massRatio2 = letter.mass / (polygon.mass + letter.mass);
            
            // Calculate velocity changes
            const p1 = polygon.mass * Math.sqrt(polygon.vx * polygon.vx + polygon.vy * polygon.vy);
            const p2 = letter.mass * Math.sqrt(letter.vx * letter.vx + letter.vy * letter.vy);
            
            // Angle of collision
            const a1 = Math.atan2(polygon.vy, polygon.vx);
            const a2 = Math.atan2(letter.vy, letter.vx);
            
            // Calculate impact force - stronger for in-place letters to create a better bounce
            const impactFactor = letter.inPlace ? 1.5 : 1.0;
            const impactForce = Math.min(2, (p1 + p2) * 0.02 * impactFactor);
            
            // Update collision tracking for letter glow effect
            letter.hitTime = Date.now();
            
            // Update velocities
            if (!letter.inPlace) {
              // If letter is not in place yet, apply normal collision response
              letter.vx += Math.cos(angle) * impactForce * massRatio1;
              letter.vy += Math.sin(angle) * impactForce * massRatio1;
            } else {
              // If letter is in place, apply a smaller effect for vibration
              letter.vx += Math.cos(angle) * impactForce * massRatio1 * 0.3;
              letter.vy += Math.sin(angle) * impactForce * massRatio1 * 0.3;
            }
            
            // Polygons bounce off more dramatically from in-place letters
            const polyBounceMultiplier = letter.inPlace ? 1.8 : 1.0;
            polygon.vx -= Math.cos(angle) * impactForce * massRatio2 * polyBounceMultiplier;
            polygon.vy -= Math.sin(angle) * impactForce * massRatio2 * polyBounceMultiplier;
            
            // Add rotation effect to polygon
            polygon.rotationSpeed += (Math.random() - 0.5) * 0.02;
          }
        });
        
        // Check collision with other polygons
        polygons.forEach(otherPolygon => {
          if (polygon !== otherPolygon) {
            const dx = otherPolygon.x - polygon.x;
            const dy = otherPolygon.y - polygon.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = polygon.size + otherPolygon.size;
            
            if (distance < minDistance) {
              // Simple bounce effect
              const angle = Math.atan2(dy, dx);
              const overlap = minDistance - distance;
              
              // Move objects apart
              const moveX = Math.cos(angle) * overlap * 0.5;
              const moveY = Math.sin(angle) * overlap * 0.5;
              
              // Apply movement based on mass
              const totalMass = polygon.mass + otherPolygon.mass;
              const massRatio1 = otherPolygon.mass / totalMass;
              const massRatio2 = polygon.mass / totalMass;
              
              // Move objects
              polygon.x -= moveX * massRatio1;
              polygon.y -= moveY * massRatio1;
              otherPolygon.x += moveX * massRatio2;
              otherPolygon.y += moveY * massRatio2;
              
              // Update velocities for bounce
              const p1 = polygon.mass * Math.sqrt(polygon.vx * polygon.vx + polygon.vy * polygon.vy);
              const p2 = otherPolygon.mass * Math.sqrt(otherPolygon.vx * otherPolygon.vx + otherPolygon.vy * otherPolygon.vy);
              
              // Apply collision response (simplified)
              const impactForce = Math.min(1, (p1 + p2) * 0.01); // Limit max force
              
              // Exchange momentum
              polygon.vx -= Math.cos(angle) * impactForce * massRatio1;
              polygon.vy -= Math.sin(angle) * impactForce * massRatio1;
              otherPolygon.vx += Math.cos(angle) * impactForce * massRatio2;
              otherPolygon.vy += Math.sin(angle) * impactForce * massRatio2;
              
              // Add rotation effect
              polygon.rotationSpeed += (Math.random() - 0.5) * 0.01;
              otherPolygon.rotationSpeed += (Math.random() - 0.5) * 0.01;
            }
          }
        });
        
        // Draw polygon
        drawPolygon(ctx, polygon);
      });
      
      // Update and draw letters
      letters.forEach(letter => {
        // Calculate vector to target if not in place
        if (!letter.inPlace) {
          const dx = letter.targetX - letter.x;
          const dy = letter.targetY - letter.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if letter is close to target
          if (distance < 2) {
            letter.inPlace = true;
            letter.x = letter.targetX;
            letter.y = letter.targetY;
            letter.vx = 0;
            letter.vy = 0;
          } else {
            // Apply force toward target
            const forceStrength = 0.005;
            letter.vx += dx * forceStrength;
            letter.vy += dy * forceStrength;
            
            // Damping to prevent oscillation
            letter.vx *= 0.95;
            letter.vy *= 0.95;
            
            // Update position
            letter.x += letter.vx;
            letter.y += letter.vy;
          }
        } else {
          // Letter is in place but can still be bumped
          // Apply damping to gradually return to target position
          const dx = letter.targetX - letter.x;
          const dy = letter.targetY - letter.y;
          
          // Spring force to return to target
          letter.vx += dx * 0.1;
          letter.vy += dy * 0.1;
          
          // Damping
          letter.vx *= 0.8;
          letter.vy *= 0.8;
          
          // Update position
          letter.x += letter.vx;
          letter.y += letter.vy;
        }
        
        // Draw letter
        drawLetter(ctx, letter);
      });
      
      // Draw ship if visible
      if (shipVisible) {
        drawShip(ctx, ship);
        
        // Update ship position for slight floating movement
        const time = Date.now() * 0.001;
        ship.x = canvas.width / 2 + Math.sin(time * 0.5) * 10;
        ship.y = canvas.height / 2 + Math.cos(time * 0.7) * 10;
        
        // Periodically show thrust
        ship.thrusting = Math.sin(time * 3) > 0.7;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      handleResize();
      createLetters(); // Recalculate letter positions
    });
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded]);
  
  // Draw functions
  const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const numStars = 200;
    
    // Use a fixed seed for consistent star pattern
    for (let i = 0; i < numStars; i++) {
      const x = (Math.sin(i * 123.456) * 0.5 + 0.5) * canvas.width;
      const y = (Math.cos(i * 567.891) * 0.5 + 0.5) * canvas.height;
      const size = Math.abs(Math.sin(i * 234.567)) * 1.5 + 0.5;
      
      // Twinkle effect
      const time = Date.now() * 0.001;
      const twinkle = (Math.sin(i + time * (i % 3 + 1)) * 0.5 + 0.5) * 0.5 + 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  const drawPolygon = (ctx: CanvasRenderingContext2D, polygon: Polygon) => {
    ctx.save();
    ctx.translate(polygon.x, polygon.y);
    ctx.rotate(polygon.rotation);
    ctx.fillStyle = polygon.color;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    const numVertices = polygon.shape.length;
    
    for (let i = 0; i < numVertices; i++) {
      const angle = i * 2 * Math.PI / numVertices;
      const radius = polygon.size * polygon.shape[i];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };
  
  const drawLetter = (ctx: CanvasRenderingContext2D, letter: Letter) => {
    ctx.save();
    
    // Add slight vibration effect for letters in place but moving
    if (letter.inPlace && (Math.abs(letter.vx) > 0.1 || Math.abs(letter.vy) > 0.1)) {
      const vibrationAmount = Math.min(3, Math.max(Math.abs(letter.vx), Math.abs(letter.vy)) * 2);
      const offsetX = (Math.random() - 0.5) * vibrationAmount;
      const offsetY = (Math.random() - 0.5) * vibrationAmount;
      ctx.translate(letter.x + offsetX, letter.y + offsetY);
    } else {
      ctx.translate(letter.x, letter.y);
    }
    
    // Add glow effect on collision
    if (letter.hitTime) {
      const timeSinceHit = Date.now() - letter.hitTime;
      if (timeSinceHit < 300) { // Glow for 300ms
        const glowOpacity = 1 - (timeSinceHit / 300);
        const glowSize = letter.size * 0.15;
        
        // Draw glow around letter
        ctx.shadowColor = letter.color === '#ffffff' ? 'rgba(100, 200, 255, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = glowSize * glowOpacity * 8;
      }
    }
    
    // Letter
    ctx.fillStyle = letter.color;
    ctx.font = `bold ${letter.size}px 'Courier New', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.char, 0, 0);
    
    ctx.restore();
  };
  
  const drawShip = (ctx: CanvasRenderingContext2D, ship: Ship) => {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.rotation);
    
    // Ship body
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(50, 100, 255, 0.2)';
    
    ctx.beginPath();
    ctx.moveTo(20, 0); // Nose
    ctx.lineTo(-10, -10); // Left back
    ctx.lineTo(-5, 0); // Back center
    ctx.lineTo(-10, 10); // Right back
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
    
    // Draw thrust
    if (ship.thrusting) {
      ctx.fillStyle = 'rgba(255, 100, 50, 0.8)';
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(-15, -5);
      ctx.lineTo(-25 - Math.random() * 10, 0);
      ctx.lineTo(-15, 5);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  // Button variants for animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        delay: 0.3 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Canvas for animation */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full bg-[#0c1222]"
      />
      
      {/* Buttons */}
      <div className="relative z-10 flex items-end justify-center h-full pb-16">
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden"
          animate={buttonsVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                duration: 0.6,
                delay: 0.2
              }
            }
          }}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link
              to="/skills"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              View Skills
            </Link>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link
              to="/resume"
              className="inline-block px-8 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition-all duration-300"
            >
              My Resume
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AsteroidsNameFormation;