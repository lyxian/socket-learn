import React, { useState, useEffect } from "react";
import Card from "./Card";
import PlayerInfo from "./PlayerInfo";
import { sortHand } from "../hooks/DeckProps";

const PlayerHand = ({ cards, name, score, myTurn }) => {
  // const [playerCards, setPlayerCards] = useState(cards);

  // useEffect(() => {
  //   console.log("change");
  // }, [playerCards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  const divClassName = myTurn ? "current" : "others";
  return (
    <div className={divClassName}>
      <div className="hand-container">
        {cards.length ? (
          sortHand(cards).map((card, index) => <Card key={index} card={card} />)
        ) : (
          <div className="card-container empty">Empty Hand</div>
        )}
      </div>
      <PlayerInfo name={name} score={score} />
    </div>
  );
};

export default PlayerHand;
