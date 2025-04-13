import React, { useEffect, useRef, useState } from 'react';
import { Ship, RotateCcw } from 'lucide-react';

// Define TypeScript interfaces
interface RockSize {
  min: number;
  max: number;
}

interface DifficultySettings {
  rockSpeed: number;
  rockFrequency: number;
  rockSize: RockSize;
}

interface GameSettings {
  [key: string]: DifficultySettings;
}

interface BoatProps {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  moveUp: boolean;
  moveDown: boolean;
  moveLeft: boolean;
  moveRight: boolean;
}

interface RockProps {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const BoatNavigationGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>('medium');
  
  // Game settings based on difficulty
  const difficultySettings: GameSettings = {
    easy: { rockSpeed: 2, rockFrequency: 60, rockSize: { min: 15, max: 30 } },
    medium: { rockSpeed: 3, rockFrequency: 45, rockSize: { min: 20, max: 40 } },
    hard: { rockSpeed: 4, rockFrequency: 30, rockSize: { min: 25, max: 50 } }
  };
  
  // Use refs to persist game state between renders
  const rocksRef = useRef<RockProps[]>([]);
  const frameCountRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  
  // Game loop using useEffect
  useEffect(() => {
    if (!gameStarted) return;
    
    const canvas = (canvasRef as any).current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number = 0;
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 500;
    
    // Game variables
    const settings = difficultySettings[difficulty];
    
    // Reset game state when starting new game
    if (gameOver) {
      rocksRef.current = [];
      frameCountRef.current = 0;
      scoreRef.current = 0;
    }
    
    // Boat properties
    const boat: BoatProps = {
      x: 100,
      y: canvas.height / 2,
      width: 60,
      height: 30,
      speed: 5,
      moveUp: false,
      moveDown: false,
      moveLeft: false,
      moveRight: false
    };
    
    // Boat image
    const boatImg = new window.Image();
    boatImg.src = "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30' width='60' height='30'%3E%3Cpath d='M15,25 L45,25 C48,25 50,20 52,15 C54,10 54,5 52,5 C50,5 48,10 45,10 L15,10 C12,10 10,5 8,5 C6,5 6,10 8,15 C10,20 12,25 15,25 Z' fill='%23475569'/%3E%3Cpath d='M17,10 L43,10 L43,5 C43,3 40,0 30,0 C20,0 17,3 17,5 Z' fill='%23f1f5f9'/%3E%3Cpath d='M25,0 C25,0 20,3 20,8 L25,8 Z' fill='%230ea5e9'/%3E%3Cpath d='M35,0 C35,0 40,3 40,8 L35,8 Z' fill='%230ea5e9'/%3E%3Cpath d='M29,0 L31,0 L31,10 L29,10 Z' fill='%23475569'/%3E%3Cpath d='M31,1 L31,3 L38,2 L31,1 Z' fill='%23ef4444'/%3E%3Cpath d='M15,24 C23,21 37,21 45,24' stroke='white' stroke-width='1' fill='none'/%3E%3Cpath d='M5,25 C9,20 11,15 9,12' stroke='%23bae6fd' stroke-width='1.5' fill='none'/%3E%3Cpath d='M55,25 C51,20 49,15 51,12' stroke='%23bae6fd' stroke-width='1.5' fill='none'/%3E%3C/svg%3E";
    
    // Rock image
    const rockImg = new window.Image();
    rockImg.src = "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='50' height='50' fill='%236b7280'%3E%3Cpath d='M11.083 15.753l-2.586-2.586a1 1 0 0 1 0-1.414L10.26 10l-1.085-1.086a1 1 0 0 1 0-1.414l3.586-3.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1-1.414 0l-1.678-1.678zm-3.812 2.839L2.684 14.005a1 1 0 0 1 0-1.414l7.172-7.172a1 1 0 0 1 1.415 0l1.583 1.583-1.415 1.415-.997-.997-5.758 5.758 3.584 3.583.997-.997 1.414 1.414-1.583 1.583a1 1 0 0 1-1.414 0z'/%3E%3C/svg%3E";
    
    // Event listeners for keyboard controls
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') boat.moveUp = true;
      if (e.key === 'ArrowDown' || e.key === 's') boat.moveDown = true;
      if (e.key === 'ArrowLeft' || e.key === 'a') boat.moveLeft = true;
      if (e.key === 'ArrowRight' || e.key === 'd') boat.moveRight = true;
    };
    
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') boat.moveUp = false;
      if (e.key === 'ArrowDown' || e.key === 's') boat.moveDown = false;
      if (e.key === 'ArrowLeft' || e.key === 'a') boat.moveLeft = false;
      if (e.key === 'ArrowRight' || e.key === 'd') boat.moveRight = false;
    };
    
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    
    // Add rocks periodically
    const addRock = () => {
      const size = Math.floor(Math.random() * (settings.rockSize.max - settings.rockSize.min + 1) + settings.rockSize.min);
      rocksRef.current.push({
        x: canvas.width + size,
        y: Math.random() * (canvas.height - size),
        width: size,
        height: size,
        speed: settings.rockSpeed
      });
    };
    
    // Check for collisions
    const checkCollision = (rect1: BoatProps | RockProps, rect2: BoatProps | RockProps) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };
    
    // Game loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw water background
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw some wave patterns
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const yPos = i * 70;
        const offset = (frameCountRef.current * 0.5 + i * 20) % 100;
        
        for (let x = -100 + offset; x < canvas.width + 100; x += 100) {
          ctx.moveTo(x - 50, yPos);
          ctx.quadraticCurveTo(x, yPos - 15, x + 50, yPos);
        }
        ctx.stroke();
      }
      
      // Update boat position
      if (boat.moveUp) boat.y = Math.max(0, boat.y - boat.speed);
      if (boat.moveDown) boat.y = Math.min(canvas.height - boat.height, boat.y + boat.speed);
      if (boat.moveLeft) boat.x = Math.max(0, boat.x - boat.speed);
      if (boat.moveRight) boat.x = Math.min(canvas.width - boat.width, boat.x + boat.speed);
      
      // Draw boat
      ctx.save();
      ctx.translate(boat.x + boat.width / 2, boat.y + boat.height / 2);
      
      // Add a slight tilt based on movement
      let tiltAngle = 0;
      if (boat.moveUp) tiltAngle -= 0.05;
      if (boat.moveDown) tiltAngle += 0.05;
      if (boat.moveLeft) tiltAngle -= 0.03;
      if (boat.moveRight) tiltAngle += 0.03;
      
      ctx.rotate(tiltAngle);
      ctx.drawImage(boatImg, -boat.width / 2, -boat.height / 2, boat.width, boat.height);
      ctx.restore();
      
      // Add new rocks
      frameCountRef.current++;
      if (frameCountRef.current % settings.rockFrequency === 0) {
        addRock();
      }
      
      // Update and draw rocks
      for (let i = 0; i < rocksRef.current.length; i++) {
        rocksRef.current[i].x -= rocksRef.current[i].speed;
        
        // Draw rock
        ctx.drawImage(rockImg, rocksRef.current[i].x, rocksRef.current[i].y, rocksRef.current[i].width, rocksRef.current[i].height);
        
        // Check for collision
        if (checkCollision(boat, rocksRef.current[i])) {
          setGameOver(true);
          window.removeEventListener('keydown', keyDownHandler);
          window.removeEventListener('keyup', keyUpHandler);
          return;
        }
        
        // Remove rocks that are off-screen
        if (rocksRef.current[i].x + rocksRef.current[i].width < 0) {
          rocksRef.current.splice(i, 1);
          i--;
          scoreRef.current += 1;
          // Update React state for UI outside the canvas
          setScore(scoreRef.current);
        }
      }
      
      // Draw score
      ctx.fillStyle = '#2d3748';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Score: ${scoreRef.current}`, 20, 30);
      
      if (!gameOver) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [gameStarted, difficulty, gameOver]);
  
  const restartGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };
  
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };
  //IF ROUTE IS demos/boat-navigation-- make pt: 40
  return (
    // <div className="flex flex-col items-center p-4 bg-blue-50 min-h-screen">
    <div className={`flex flex-col items-center p-4 bg-blue-50 min-h-screen  ${window.location.pathname === '/demos/boat-navigation' ? 'pt-40' : ''}`}>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Maritime Navigation Challenge</h1>
      
      {!gameStarted && !gameOver ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <div className="mb-4">
            <Ship className="w-16 h-16 text-blue-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Navigate the Waters</h2>
          <p className="text-gray-600 mb-6">
            Use arrow keys or WASD to navigate your boat through treacherous waters.
            Avoid the rocks to survive and score points!
          </p>
          
          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">
              Select Difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <button
            onClick={() => setGameStarted(true)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="relative mb-4">
            <canvas
              ref={canvasRef}
              className="border-4 border-blue-700 rounded-lg shadow-lg"
              tabIndex={0}
            ></canvas>
            
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center">
                  <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over!</h2>
                  <p className="text-xl text-gray-800 mb-4">Your Score: {score}</p>
                  <button
                    onClick={restartGame}
                    className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Controls:</h2>
            <ul className="text-gray-700 grid grid-cols-2 gap-x-8 gap-y-2">
              <li className="flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded mr-2 font-mono">↑</span> or 
                <span className="bg-gray-200 px-2 py-1 rounded mx-2 font-mono">W</span>
                <span>Move Up</span>
              </li>
              <li className="flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded mr-2 font-mono">↓</span> or 
                <span className="bg-gray-200 px-2 py-1 rounded mx-2 font-mono">S</span>
                <span>Move Down</span>
              </li>
              <li className="flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded mr-2 font-mono">←</span> or 
                <span className="bg-gray-200 px-2 py-1 rounded mx-2 font-mono">A</span>
                <span>Move Left</span>
              </li>
              <li className="flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded mr-2 font-mono">→</span> or 
                <span className="bg-gray-200 px-2 py-1 rounded mx-2 font-mono">D</span>
                <span>Move Right</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BoatNavigationGame;