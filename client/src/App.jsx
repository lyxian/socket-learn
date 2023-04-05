import React, { useEffect, useState, createContext } from "react";
// import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
import PlayerHand from "./components/PlayerHand";
import PlayerArea from "./components/PlayerArea";
import { newDeck, distributeDeck } from "./hooks/DeckProps";

import { sampleCards, players } from "./data";
import "./App.css";

const CardContext = createContext();
const GameContext = createContext();

const deckObj = newDeck;
const hands = distributeDeck(newDeck, 4);

function App() {
  const [deck, setDeck] = useState(deckObj);
  console.log(deck, hands);

  // const [cards, setCards] = useState(sampleCards);
  const gameObj = players.map((name, index) => {
    return { name, index, cards: hands[index] };
  });
  const [game, setGame] = useState(gameObj);

  // useEffect(() => {
  //   console.log("update");
  //   setGame(game);
  // }, [game]);

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
                score="0"
              />
            );
          })}
          {/* <PlayerHand cards={game["you"].cards} name="you" score="0" />
          <PlayerHand cards={game["bot_1"].cards} name="bot_1" score="0" />
          <PlayerHand cards={game["bot_2"].cards} name="bot_2" score="0" />
          <PlayerHand cards={game["bot_3"].cards} name="bot_3" score="0" /> */}
        </div>
        <div className="play-area-wrapper">
          <PlayerArea />
        </div>
        {/* </CardContext.Provider> */}
      </GameContext.Provider>
    </div>
  );
}

export { CardContext, GameContext };
export default App;
