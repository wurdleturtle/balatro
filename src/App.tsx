import { useState } from 'react';
import './App.css';
import BalatroCard from './components/balatrocard';

function App() {
  // State to store the sprite index
  const [spriteIndex, setSpriteIndex] = useState<number>(23);

  // Function to generate a random sprite index between 1 and 89
  const getRandomSpriteIndex = () => {
    const randomIndex = Math.floor(Math.random() * 89) + 1; // Random number between 1 and 89
    setSpriteIndex(randomIndex);
  };

  return (
    <>
      <div>
        {/* Button to change sprite index */}
        <button onClick={getRandomSpriteIndex}>Set Random Goober</button>

        {/* Displaying the card with the current sprite index */}
        <BalatroCard spriteIndex={spriteIndex} posx={100} posy={100} />
      </div>
    </>
  );
}

export default App;
