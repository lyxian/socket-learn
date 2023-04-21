import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomRoomId, roomExists } from "../hooks/RoomProps";
import { UserContext } from "../App";

import socketIO from "socket.io-client";

const Lobby = ({ user, setHasUsername }) => {
  const { socket, setSocket } = useContext(UserContext);
  const [toggleRoomInput, setToggleRoomInput] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = socketIO.connect(
      `${process.env.LOCALHOST}:${process.env.PORT}`
    );
    setSocket(newSocket);
    newSocket.emit("new user", user);
  }, [setSocket]);

  const handleChangeName = (e) => {
    navigate("/");
  };

  const handleCreateRoom = (e) => {
    const roomId = getRandomRoomId();
    socket.emit("new room", { user, roomId });
    console.log(roomId);
    navigate("/room/" + roomId);
  };

  const handleJoinRoom = (e) => {
    const updatedRoomInput = roomInput.toUpperCase();
    setRoomInput(updatedRoomInput);
    if (updatedRoomInput.length != 6) {
      console.log("Valid room ID should be 6 characters long");
      return;
    }
    if (!/^[A-Z]*$/.test(updatedRoomInput)) {
      console.log("Valid room ID should not contain non-characters");
      return;
    }
    if (roomExists(updatedRoomInput)) {
      socket.emit("join room", { user, roomId: updatedRoomInput });
      navigate("/room/" + updatedRoomInput);
    }
  };

  const toggleJoinRoom = (e) => {
    setToggleRoomInput(!toggleRoomInput);
  };

  return (
    <>
      <div
        className={
          toggleRoomInput ? "lobby-action-wrapper" : "lobby-action-wrapper-row"
        }
      >
        {toggleRoomInput ? (
          <>
            <label htmlFor="roomId">Enter room ID</label>
            <input
              type="text"
              name="username"
              className="input-text-container"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              required
              minLength={6}
            />
            <div>
              <button
                className="lobby-button"
                onClick={(e) => handleJoinRoom(e)}
              >
                JOIN ROOM
              </button>
              <button
                className="lobby-button"
                onClick={(e) => toggleJoinRoom(e)}
              >
                BACK
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="lobby-button"
              onClick={(e) => handleCreateRoom(e)}
            >
              CREATE ROOM
            </button>
            <button className="lobby-button" onClick={(e) => toggleJoinRoom(e)}>
              JOIN ROOM
            </button>
          </>
        )}
      </div>
      <div className="username-wrapper">
        <div className="username-container">
          Player Name is <span>{user}</span>
        </div>
        <button className="lobby-button" onClick={(e) => setHasUsername(false)}>
          CHANGE NAME
        </button>
      </div>
    </>
  );
};

export default Lobby;
