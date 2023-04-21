import React, { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import RoomPlayerCard from "./RoomPlayerCard";
import RoomAction from "./RoomAction";
import RoomMessages from "./RoomMessages";

const RoomContext = createContext();

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { username, socket } = useContext(UserContext);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({});

  useEffect(() => {
    socket.emit("get players", roomId);

    socket.on("send players", (playersResponse) => {
      const thisPlayer = playersResponse.find((player) => {
        return player.name === username;
      });
      setPlayers(playersResponse);
      if (thisPlayer === undefined) {
        alert("you are kicked");
        console.log("you are kicked");
        navigate("/");
        return;
      }
      setCurrentPlayer(thisPlayer);
    });
  }, [socket]);

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
        <RoomContext.Provider
          value={{ socket, roomId, currentPlayer, players, setPlayers }}
        >
          <div className="room-players-container">
            {players.map((player, index) => {
              return (
                <RoomPlayerCard player={player} index={index} key={index} />
              );
            })}
          </div>
          <div className="room-action-message-wrapper">
            <RoomMessages />
            <RoomAction />
          </div>
        </RoomContext.Provider>
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
export { RoomContext };
