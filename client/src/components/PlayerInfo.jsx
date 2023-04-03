import React, { useState } from "react";

const PlayerInfo = ({ name, score }) => {
  return (
    <div className="info-container">
      <span>Player Name: {name}</span>
      <span>Player Score: {score}</span>
    </div>
  );
};

export default PlayerInfo;
