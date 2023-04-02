import "./App.css";
// import Card from "./components/Card";
import CardsWrapper from "./components/CardsWrapper";

function App() {
  return (
    <div className="App">
      {/* <Card symbol="♥" color="red" number="1" /> */}
      <CardsWrapper cardsNumber="5" />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;
