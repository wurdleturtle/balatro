import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  spriteIndex: number; // Index of the sprite in the sprite sheet (0-based)
  posx: number;
  posy: number;
}

const SPRITE_WIDTH = 141; // Width of each sprite in the spritesheet (141px)
const SPRITE_HEIGHT = 189; // Height of each sprite in the spritesheet (189px)
const COLUMNS = Math.floor(1420 / SPRITE_WIDTH); // Number of columns based on spritesheet width
const ROWS = Math.floor(3040 / SPRITE_HEIGHT); // Number of rows based on spritesheet height

// Hardcoded display size for each sprite
const DISPLAY_WIDTH = 140; // The width of the sprite when displayed on screen
const DISPLAY_HEIGHT = 185; // The height of the sprite when displayed on screen

const BalatroCard = ({ spriteIndex, posx, posy }: Props) => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: posx, y: posy });
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Rotation speed factor (decreased for slower rotation)
  const rotationSpeed = 0.02; // Lower value for slower rotation
  const rotationLimit = 30; // Max rotation in degrees

  // Function to calculate rotation based on drag velocity (use velocity for more dynamic rotation)
  const calculateRotation = (velocity: number) => {
    const angle = velocity * rotationSpeed; // Apply slower speed factor to the velocity
    return Math.max(Math.min(angle, rotationLimit), -rotationLimit); // Limit between -30 and 30 degrees
  };

  // Calculate the row and column based on the sprite index
  const row = Math.floor(spriteIndex / COLUMNS);
  const col = spriteIndex % COLUMNS;

  // Calculate the background position (in negative pixels)
  const backgroundX = -(col * SPRITE_WIDTH);
  const backgroundY = -(row * SPRITE_HEIGHT);

  // Calculate the background size (the total size of the spritesheet)
  const backgroundSize = `${SPRITE_WIDTH * COLUMNS}px ${
    SPRITE_HEIGHT * ROWS
  }px`;

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { type: 'spring', stiffness: 200, damping: 25 },
    });
  }, [position, controls]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="balatrocard cursor-grab"
        drag
        dragElastic={0.3} // Increased for a smoother drag effect
        dragMomentum={true}
        whileDrag={{ scale: 1.3 }} // Increased size during drag
        whileHover={{ scale: 1.2 }} // Scale the card when hovered
        onDrag={(_, info) => {
          const velocity = info.velocity.x;
          const angle = calculateRotation(velocity);
          setRotation(angle);
          setDragging(true);
        }}
        onDragEnd={(_) => {
          setPosition({ x: position.x, y: position.y });
          setRotation(0);
          setDragging(false);
        }}
        animate={controls}
        style={{
          width: `${DISPLAY_WIDTH}px`,
          height: `${DISPLAY_HEIGHT}px`,
          backgroundImage: 'url(https://images.wurdle.eu/Jokers.png)', // Path to your spritesheet
          backgroundPosition: `${backgroundX}px ${backgroundY}px`,
          backgroundSize: backgroundSize,
          backgroundRepeat: 'no-repeat',
          rotate: rotation,
          transition: dragging
            ? 'none'
            : 'rotate 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Smooth transition when not dragging
          zIndex: dragging ? 999 : 'auto',
        }}
      />
    </div>
  );
};

export default BalatroCard;
