// Sprite.tsx
import React from 'react';

// Constants based on your spritesheet dimensions
const SPRITE_WIDTH = 141;
const SPRITE_HEIGHT = 190;
const COLUMNS = Math.floor(1420 / SPRITE_WIDTH); // 10 columns based on the spritesheet's width
const ROWS = Math.floor(3040 / SPRITE_HEIGHT); // 16 rows based on the spritesheet's height

// Hardcoded display size for each sprite
const DISPLAY_WIDTH = 140; // The width of the sprite when displayed on screen
const DISPLAY_HEIGHT = 190; // The height of the sprite when displayed on screen

interface SpriteProps {
  Card: number; // The index of the sprite in the grid (0-based)
}

const Sprite: React.FC<SpriteProps> = ({ Card }) => {
  // Calculate the row and column based on the sprite index
  const row = Math.floor(Card / COLUMNS);
  const col = Card % COLUMNS;

  // Calculate the background position (in negative pixels)
  const backgroundX = -(col * SPRITE_WIDTH);
  const backgroundY = -(row * SPRITE_HEIGHT);

  // Calculate the background size (the total size of the spritesheet)
  const backgroundSize = `${SPRITE_WIDTH * COLUMNS}px ${
    SPRITE_HEIGHT * ROWS
  }px`;

  return (
    <div
      style={{
        width: `${DISPLAY_WIDTH}px`,
        height: `${DISPLAY_HEIGHT}px`,
        backgroundImage: 'url(https://images.wurdle.eu/Jokers.png)', // Path to your spritesheet
        backgroundPosition: `${backgroundX}px ${backgroundY}px`,
        backgroundSize: backgroundSize,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

export default Sprite;
