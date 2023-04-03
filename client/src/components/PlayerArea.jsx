import React, { useState, useContext } from "react";
// import Card from "./Card";
// import PlayerInfo from "./PlayerInfo";
import { newDeck, drawFromDeck } from "../hooks/DeckProps";
import { CardContext } from "../App";

const PlayerArea = () => {
  const { cards, setCards } = useContext(CardContext);
  const drawEvent = (e) => {
    let card = drawFromDeck(newDeck);
    alert(`You drawn ${card}`);
    setCards([...cards, card]);
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
