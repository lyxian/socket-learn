import React, { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import RoomPlayerCard from "./RoomPlayerCard";
import RoomAction from "./RoomAction";
import RoomMessages from "./RoomMessages";

import { samplePlayers } from "../data";

const PlayersContext = createContext();

const Room = ({ socket }) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { username } = useContext(UserContext);
  const [players, setPlayers] = useState(samplePlayers);

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:4000`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [players]);

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
        <div className="room-info-container">Game Lobby -- {roomId}</div>
        <PlayersContext.Provider value={{ players, setPlayers }}>
          <div className="room-players-container">
            {players.map((player, index) => {
              return (
                <RoomPlayerCard player={player} index={index} key={index} />
              );
            })}
          </div>
          <div className="room-action-message-wrapper">
            <RoomMessages />
            <RoomAction user={players[1]} />
          </div>
        </PlayersContext.Provider>
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
export { PlayersContext };
