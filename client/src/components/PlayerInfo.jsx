import React, { useState } from "react";

const PlayerInfo = ({ name, score }) => {
  return (
    <div className="info-container">
      <span>Name: {name}</span>
      <span>Score: {score}</span>
    </div>
  );
};

export default PlayerInfo;
