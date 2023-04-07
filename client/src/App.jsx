import React, { useEffect, useState, createContext } from "react";
// import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
import PlayerHand from "./components/PlayerHand";
import PlayerArea from "./components/PlayerArea";
import { newDeck, distributeDeck } from "./hooks/DeckProps";

import { Deck, players } from "./data";
import "./App.css";

const CardContext = createContext();
const GameContext = createContext();

const deckObj = newDeck; // Deck; // newDeck;
const hands = distributeDeck(deckObj, 5);

function App() {
  const [deck, setDeck] = useState(deckObj);
  // console.log(deck, hands);
  const gameObj = players.map((name, index) => {
    return { name, index, cards: hands[index], score: 0 };
  });
  const [game, setGame] = useState(gameObj);

  return (
    <div className="App">
      {/* <CardContext.Provider value={{ cards, setCards }}> */}
      <GameContext.Provider value={{ game, setGame, deck, setDeck }}>
        <div className="hand-area-wrapper">
          {game.map((player, index) => {
            return (
              <PlayerHand
                key={index}
                cards={player.cards}
                name={player.name}
                score={player.score}
              />
            );
          })}
        </div>
        <PlayerArea />
        {/* </CardContext.Provider> */}
      </GameContext.Provider>
    </div>
  );
}

export { CardContext, GameContext };
export default App;
