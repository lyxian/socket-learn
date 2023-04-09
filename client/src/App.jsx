import React, { useEffect, useState, createContext } from "react";
// import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
import PlayerHand from "./components/PlayerHand";
import PlayerArea from "./components/PlayerArea";
import MoveHistory from "./components/MoveHistory";
import { newDeck, distributeDeck } from "./hooks/DeckProps";

import { Deck, players } from "./data";
import "./App.css";

const CardContext = createContext();
const GameContext = createContext();

const deckObj = newDeck; // Deck; // newDeck;
const hands = distributeDeck(deckObj, 5);
// console.log(deckObj);

function App() {
  const [deck, setDeck] = useState(deckObj);
  const gameObj = players.map((name, index) => {
    return { name, index, cards: hands[index], score: 0 };
  });
  const [game, setGame] = useState(gameObj);
  const [turn, setTurn] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);

  return (
    <div className="App">
      {/* <CardContext.Provider value={{ cards, setCards }}> */}
      <GameContext.Provider
        value={{
          game,
          setGame,
          deck,
          setDeck,
          turn,
          setTurn,
          moveHistory,
          setMoveHistory,
        }}
      >
        <div className="left-area-wrapper">
          <div className="hand-area-wrapper">
            {game.map((player, index) => {
              return (
                <PlayerHand
                  key={index}
                  cards={player.cards}
                  name={player.name}
                  score={player.score}
                  myTurn={turn % players.length === index}
                />
              );
            })}
          </div>
          <div className="move-history-area">
            <div className="useful-info">
              <span>Move History</span>
              <hr className="horizontal-line" />
              <span>Cards Left: {deck.length}</span>
            </div>
            <hr className="vertical-line" />
            <div className="move-history-wrapper">
              {moveHistory.length ? (
                moveHistory.map((move, index) => {
                  return <MoveHistory key={index} move={move} />;
                })
              ) : (
                <div className="move-history-container">No moves yet</div>
              )}
            </div>
          </div>
        </div>
        <PlayerArea />
        {/* </CardContext.Provider> */}
      </GameContext.Provider>
    </div>
  );
}

export { CardContext, GameContext };
export default App;
