import React, { useState } from "react";

const Card = ({ card, owner }) => {
  const symbol = card.slice(-1);
  const cardObj = owner.includes("bott") ? (
    <span style={{ display: "none" }}>{card}</span>
  ) : ["♥", "♦"].includes(symbol) ? (
    <span style={{ color: "red" }}>{card}</span>
  ) : (
    <span>{card}</span>
  );
  return <div className="card-container">{cardObj}</div>;
};

export default Card;
