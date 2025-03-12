import './App.css';
import BalatroCard from './components/balatrocard';

function App() {
  return (
    <>
      <BalatroCard
        src="https://images.wurdle.eu/Jimbo.png"
        posx={100}
        posy={100}
      />
      <BalatroCard
        src="https://images.wurdle.eu/Jimbo.png"
        posx={200}
        posy={100}
      />
      <BalatroCard
        src="https://images.wurdle.eu/Jimbo.png"
        posx={300}
        posy={100}
      />
      <BalatroCard
        src="https://images.wurdle.eu/Jimbo.png"
        posx={400}
        posy={100}
      />
      <BalatroCard
        src="https://images.wurdle.eu/Jimbo.png"
        posx={500}
        posy={100}
      />
    </>
  );
}

export default App;
