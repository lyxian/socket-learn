import React, { useState, useContext } from "react";

const RoomPlayerCard = ({ index, player }) => {
  return (
    <div className="player-container">
      {/* <div className="">Player {index + 1}</div> */}
      <h3>Player {index + 1}</h3>
      <div className={`player-status-${player.status}`}>{player.status}</div>
      <div className="">{player.name}</div>
      {player.isHost && <div className="">Host</div>}
      {player.isBot && <div className="">Bot</div>}
    </div>
  );
};

export default RoomPlayerCard;
