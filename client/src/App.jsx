import React, { useEffect, useState, createContext } from "react";
// import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
import PlayerHand from "./components/PlayerHand";
import PlayerArea from "./components/PlayerArea";

import { sampleCards } from "./data";
import "./App.css";

const CardContext = createContext();

function App() {
  const [cards, setCards] = useState(sampleCards);
  return (
    <div className="App">
      <CardContext.Provider value={{ cards, setCards }}>
        <div className="hand-area-wrapper">
          <PlayerHand cards={cards} name="you" score="0" />
        </div>
        <div className="play-area-wrapper">
          <PlayerArea />
        </div>
      </CardContext.Provider>
    </div>
  );
}

export { CardContext };
export default App;
