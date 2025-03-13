import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  EnhancerSpriteSheetUrl?: string;
  DeckSpriteSheetUrl?: string;
  EnhancerSpriteIndex: number;
  DeckSpriteIndex: number;
  posx: number;
  posy: number;
}

const Enhancer_WIDTH = 141;
const Enhancer_HEIGHT = 185;
const Deck_WIDTH = 141;
const Deck_HEIGHT = 185;

const FG_COLUMNS = Math.floor(994 / Enhancer_WIDTH);
const FG_ROWS = Math.floor(950 / Enhancer_HEIGHT);
const BG_COLUMNS = Math.floor(1846 / Deck_WIDTH);
const BG_ROWS = Math.floor(760 / Deck_HEIGHT);

const DeckCards = ({
  EnhancerSpriteSheetUrl = 'https://images.wurdle.eu/Enhancers.png',
  DeckSpriteSheetUrl = 'https://images.wurdle.eu/Deck.png',
  EnhancerSpriteIndex,
  DeckSpriteIndex,
  posx,
  posy,
}: Props) => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: posx, y: posy });
  const [rotation, setRotation] = useState(0);

  const rotationSpeed = 0.02;
  const rotationLimit = 30;

  const calculateRotation = (velocity: number) => {
    const angle = velocity * rotationSpeed;
    return Math.max(Math.min(angle, rotationLimit), -rotationLimit);
  };

  const fgRow = Math.floor(EnhancerSpriteIndex / FG_COLUMNS);
  const fgCol = EnhancerSpriteIndex % FG_COLUMNS;
  const bgRow = Math.floor(DeckSpriteIndex / BG_COLUMNS);
  const bgCol = DeckSpriteIndex % BG_COLUMNS;

  const EnhancerX = -(fgCol * Enhancer_WIDTH);
  const EnhancerY = -(fgRow * Enhancer_HEIGHT);
  const DeckX = -(bgCol * Deck_WIDTH);
  const DeckY = -(bgRow * Deck_HEIGHT);

  const DeckSize = `${Deck_WIDTH * BG_COLUMNS}px ${Deck_HEIGHT * BG_ROWS}px`;
  const EnhancerSize = `${Enhancer_WIDTH * FG_COLUMNS}px ${
    Enhancer_HEIGHT * FG_ROWS
  }px`;

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { type: 'spring', stiffness: 200, damping: 25 },
    });
  }, [position, controls]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-100 balatrocard">
      <motion.div
        className="relative"
        drag
        dragElastic={0.3}
        dragMomentum={true}
        whileDrag={{ scale: 1.3 }}
        whileHover={{ scale: 1.2 }}
        onDrag={(_, info) => {
          const velocity = info.velocity.x;
          const angle = calculateRotation(velocity);
          setRotation(angle);
        }}
        onDragEnd={() => {
          setPosition({ x: position.x, y: position.y });
          setRotation(0);
        }}
        animate={controls}
        style={{ position: 'absolute', rotate: `${rotation}deg` }}
      >
        {/* Deck Layer */}
        <motion.div
          style={{
            width: `${Deck_WIDTH}px`,
            height: `${Deck_HEIGHT}px`,
            backgroundImage: `url(${DeckSpriteSheetUrl})`,
            backgroundPosition: `${DeckX}px ${DeckY}px`,
            backgroundSize: DeckSize,
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            zIndex: 1,
          }}
          animate={{ rotate: rotation }}
        />

        {/* Enhancer Layer */}
        <motion.div
          style={{
            width: `${Enhancer_WIDTH}px`,
            height: `${Enhancer_HEIGHT}px`,
            backgroundImage: `url(${EnhancerSpriteSheetUrl})`,
            backgroundPosition: `${EnhancerX}px ${EnhancerY}px`,
            backgroundSize: EnhancerSize,
            backgroundRepeat: 'no-repeat',
            zIndex: 2,
          }}
          animate={{ rotate: rotation }}
        />
      </motion.div>
    </div>
  );
};

export default DeckCards;
