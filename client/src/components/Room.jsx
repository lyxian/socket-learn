import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import RoomPlayerCard from "./RoomPlayerCard";
import RoomAction from "./RoomAction";
import RoomMessages from "./RoomMessages";

import { players } from "../data";

const Room = ({ socket }) => {
  const { roomId } = useParams();
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > Number(price)) {
      socket.emit("bidProduct", {
        amount,
        last_bidder: localStorage.getItem("userName"),
        name,
      });
      navigate("/products");
    } else {
      setError(true);
    }
  };

  const backToLobby = (e) => {
    navigate("/");
  };

  return (
    <>
      <div className="room-wrapper">
        <div className="room-info-container">Game Lobby ({roomId})</div>
        <div className="room-players-container">
          {players.map((player, index) => {
            return <RoomPlayerCard player={player} index={index} key={index} />;
          })}
        </div>
        <div className="room-action-message-wrapper">
          <RoomMessages />
          <RoomAction user={players[0]} />
        </div>
      </div>
      <div className="username-wrapper">
        <div className="username-container">
          Player Name is <span>{username}</span>
        </div>
        <button className="lobby-button" onClick={(e) => backToLobby(false)}>
          CHANGE NAME
        </button>
      </div>
    </>
  );
};

export default Room;
