import { useState } from 'react';
import JokerCard from './components/JokerCard';
import './App.css';
import DeckCards from './components/DeckCards';

const App = () => {
  // State for JokerCard and DeckCards
  const [jokerCardSpriteIndex, setJokerCardSpriteIndex] = useState(43);

  const [deckCardsSpriteIndex, setDeckCardsSpriteIndex] = useState(1);
  const [enhancerSpriteIndex, setEnhancerSpriteIndex] = useState(1);

  return (
    <div>
      <div>
        <h3>JokerCard</h3>
        <label>
          Sprite Index:
          <input
            type="number"
            value={jokerCardSpriteIndex}
            onChange={(e) => setJokerCardSpriteIndex(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <h3>DeckCards</h3>
        <label>
          Deck Sprite Index:
          <input
            type="number"
            value={deckCardsSpriteIndex}
            onChange={(e) => setDeckCardsSpriteIndex(Number(e.target.value))}
          />
        </label>
        <label>
          Enhancer Sprite Index:
          <input
            type="number"
            value={enhancerSpriteIndex}
            onChange={(e) => setEnhancerSpriteIndex(Number(e.target.value))}
          />
        </label>
      </div>

      <JokerCard spriteIndex={jokerCardSpriteIndex} posx={300} posy={100} />
      <DeckCards
        DeckSpriteIndex={deckCardsSpriteIndex}
        EnhancerSpriteIndex={enhancerSpriteIndex}
        posx={100}
        posy={100}
      />
    </div>
  );
};

export default App;
