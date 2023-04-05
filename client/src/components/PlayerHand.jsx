import React, { useState, useEffect } from "react";
import Card from "./Card";
import PlayerInfo from "./PlayerInfo";
import { sortHand } from "../hooks/DeckProps";

const PlayerHand = ({ cards, name, score }) => {
  // const [playerCards, setPlayerCards] = useState(cards);

  // useEffect(() => {
  //   console.log("change");
  // }, [playerCards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  return (
    <div>
      <div className="hand-container">
        {sortHand(cards).map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      <PlayerInfo name={name} score={score} />
    </div>
  );
};

export default PlayerHand;
