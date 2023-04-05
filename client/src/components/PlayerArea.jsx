import React, { useState, useContext } from "react";
// import Card from "./Card";
// import PlayerInfo from "./PlayerInfo";
import { drawFromDeck } from "../hooks/DeckProps";
import { CardContext, GameContext } from "../App";

const PlayerArea = () => {
  // const { cards, setCards } = useContext(CardContext);
  const { game, setGame, deck } = useContext(GameContext);
  const [turn, setTurn] = useState(0);

  const drawEvent = (e) => {
    let card = drawFromDeck(deck);
    if (card) {
      console.log(turn, card);
      // alert(`You drawn ${card}`);
      setGame(
        game.map((player) => {
          if (player.index === turn % 4) {
            player.cards = [...player.cards, card];
          }
          return player;
        })
      );
      setTurn(turn + 1);
    } else {
      console.log("Deck has no more cards.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  return (
    <>
      <button onClick={drawEvent}>Draw Card</button>
    </>
  );
};

export default PlayerArea;
