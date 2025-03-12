import './App.css';
import JokerCard from './components/JokerCard';

function App() {
  return (
    <>
      <div>
        {/* Displaying the card with the current sprite index */}
        <JokerCard spriteIndex={43} posx={100} posy={100} />
      </div>
    </>
  );
}

export default App;
