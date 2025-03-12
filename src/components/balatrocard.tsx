import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  src: string;
  posx: number;
  posy: number;
}

const BalatroCard = ({ src, posx, posy }: Props) => {
  // Fixed typo in destructuring
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: posx, y: posy }); // Set initial position to passed props

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { type: 'spring', stiffness: 250, damping: 20 },
    });
  }, [position, controls]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-100">
      <motion.img
        src={src}
        alt="Draggable"
        className="balatrocard cursor-grab"
        drag
        dragElastic={0.2}
        dragMomentum={true}
        whileDrag={{ scale: 1.6 }}
        onDragEnd={(_) => setPosition({ x: position.x, y: position.y })} // Update position after drag
        animate={controls}
      />
    </div>
  );
};

export default BalatroCard;
