import React, { useState } from "react";

const Card = ({ card }) => {
  const symbol = card.slice(-1);
  const cardObj = ["♥", "♦"].includes(symbol) ? (
    <span style={{ color: "red" }}>{card}</span>
  ) : (
    <span>{card}</span>
  );
  return <div className="card-container">{cardObj}</div>;
};

export default Card;
