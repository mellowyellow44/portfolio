import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';

interface ConfettiPieceProps {
  color: string;
  size: number;
  delay: number;
  duration: number;
  left: number;
  rotate: number;
}

// Define animations with @emotion/react
const fallAnimation = keyframes`
  0% { transform: translateY(-20px) scale(0) rotate(0deg); opacity: 0; }
  25% { transform: translateY(30px) scale(1) rotate(45deg); opacity: 1; }
  100% { transform: translateY(120px) scale(0.5) rotate(90deg); opacity: 0; }
`;

// Styled confetti piece
const StyledConfetti = styled('div')<ConfettiPieceProps>`
  position: absolute;
  top: 50%;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: ${props => props.size / 5}px;
  animation: ${fallAnimation} ${props => props.duration}s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  transform-origin: center;
`;

// Styled greeting container
const fadeInAnimation = keyframes`
  0% { transform: scale(0) translateY(0); opacity: 0; }
  60% { transform: scale(1.2) translateY(-20px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const GreetingContainer = styled(Box)`
  animation: ${fadeInAnimation} 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
  text-align: center;
`;

const bounceAnimation = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.1) rotate(10deg); }
  75% { transform: scale(0.9) rotate(-10deg); }
  100% { transform: scale(1) rotate(0); }
`;

const SubGreeting = styled(Box)`
  animation: ${bounceAnimation} 0.8s ease-in-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
  transform: scale(0);
  animation-fill-mode: forwards;
`;

interface ConfettiPiece {
  id: number;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
}

const generateConfetti = (count: number): ConfettiPiece[] => {
  const colors: string[] = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff99c8'];
  const confetti: ConfettiPiece[] = [];
  
  for (let i = 0; i < count; i++) {
    confetti.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.floor(Math.random() * 10) + 5, // 5px to 15px
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1.5 + 1.5, // 1.5s to 3s
      rotate: Math.random() * 720 - 360 // -360deg to 360deg
    });
  }
  
  return confetti;
};

const GreetingButton: React.FC = () => {
  const [showGreeting, setShowGreeting] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  const handleClick = (): void => {
    setShowGreeting(true);
    setConfetti(generateConfetti(100));
    
    // Reset after animation completes
    setTimeout(() => {
      setShowGreeting(false);
      setConfetti([]);
    }, 5000);
  };
  
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #e0f7fa, #e8eaf6)',
        overflow: 'hidden',
      }}
    >
      {!showGreeting && (
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            backgroundColor: '#9c27b0',
            // '&:hover': {
            //   backgroundColor: '#7b1fa2',
            // },
            px: 4,
            py: 1.5,
            borderRadius: 28,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
            transition: 'all 0.3s',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Press Me
        </Button>
      )}
      
      {showGreeting && (
        <GreetingContainer>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #e91e63, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Good Morning!
          </Typography>
          
          <SubGreeting>
            <Typography 
              variant="h5"
              sx={{ color: '#616161' }}
            >
              Have an amazing day! ✨
            </Typography>
          </SubGreeting>
        </GreetingContainer>
      )}
      
      {confetti.map((piece) => (
        <StyledConfetti
          key={piece.id}
          color={piece.color}
          size={piece.size}
          left={piece.left}
          delay={piece.delay}
          duration={piece.duration}
          rotate={piece.rotate}
        />
      ))}
    </Box>
  );
};

export default GreetingButton;