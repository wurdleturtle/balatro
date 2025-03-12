import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  src: string;
  posx: number;
  posy: number;
}

const BalatroCard = ({ src, posx, posy }: Props) => {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: posx, y: posy });
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(1); // State to manage the scale of the card

  // Rotation speed factor (decreased for slower rotation)
  const rotationSpeed = 0.2; // Lower value for slower rotation
  const rotationLimit = 30; // Max rotation in degrees

  // Function to calculate rotation based on drag velocity (use velocity for more dynamic rotation)
  const calculateRotation = (velocity: number) => {
    const angle = velocity * rotationSpeed; // Apply slower speed factor to the velocity
    return Math.max(Math.min(angle, rotationLimit), -rotationLimit); // Limit between -30 and 30 degrees
  };

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { type: 'spring', stiffness: 200, damping: 25 },
    });
  }, [position, controls]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-100">
      <motion.img
        src={src}
        alt="Draggable"
        className="balatrocard cursor-grab"
        drag
        dragElastic={0.3} // Increased for a smoother drag effect
        dragMomentum={true}
        whileDrag={{ scale: 1.3 }} // Increased size during drag
        onDrag={(_, info) => {
          // Use the velocity (speed) of the drag to calculate rotation
          const velocity = info.velocity.x; // Get the horizontal velocity of the drag
          const angle = calculateRotation(velocity); // Calculate rotation based on velocity
          setRotation(angle); // Update the rotation state smoothly
          setDragging(true);
          setScale(1.3); // Increase the scale during drag
        }}
        onDragEnd={(_) => {
          setPosition({ x: position.x, y: position.y });
          setRotation(0); // Reset the rotation back to 0 when the drag ends
          setDragging(false);
          setScale(1); // Reset the scale to 1 (original size)
        }}
        animate={controls}
        style={{
          rotate: rotation, // Apply rotation to the image
          scale: scale, // Apply scale to the image
          transition: dragging
            ? 'none'
            : 'rotate 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Smooth transition when not dragging
          zIndex: dragging ? 999 : 'auto', // Set z-index to 999 when dragging
        }}
      />
    </div>
  );
};

export default BalatroCard;
