import React, { useState, useContext } from "react";
import { addBot, kickPlayer, readyPlayer } from "../hooks/RoomProps";
import { PlayersContext } from "./Room";

const RoomAction = ({ user }) => {
  const { players, setPlayers } = useContext(PlayersContext);
  const [addBotMode, setAddBotMode] = useState(false);
  const [kickPlayerMode, setKickPlayerMode] = useState(false);

  const handleReadyPlayer = (getReady) => {
    const updatedPlayers = readyPlayer([...players], user.name, getReady);
    console.log(updatedPlayers);
    setPlayers(updatedPlayers);
  };

  const handleAddBot = (index) => {
    const updatedPlayers = addBot([...players], index);
    console.log(index, updatedPlayers);
    setPlayers(updatedPlayers);
    setAddBotMode(!addBotMode);
  };

  const handleKickPlayer = (index) => {
    const updatedPlayers = kickPlayer([...players], index);
    console.log(index, updatedPlayers);
    setPlayers(updatedPlayers);
    setKickPlayerMode(!kickPlayerMode);
  };

  const toggleAddBot = (e) => {
    kickPlayerMode && setKickPlayerMode(!kickPlayerMode);
    setAddBotMode(!addBotMode);
  };

  const toggleKickPlayer = (e) => {
    addBotMode && setAddBotMode(!addBotMode);
    setKickPlayerMode(!kickPlayerMode);
  };

  return (
    <div className="room-action-wrapper">
      {user.isHost ? (
        <>
          <div className="room-action-choices">
            {addBotMode && (
              <>
                <h4 className="choice-message">Adding bot</h4>
                <div className="choice-button-container">
                  {players.map((player, index) => {
                    return player.status == "empty" ? (
                      <button
                        className="choice-button"
                        key={index}
                        onClick={(e) => handleAddBot(index)}
                      >
                        Player {index + 1}
                      </button>
                    ) : (
                      <button
                        className="choice-button choice-invalid"
                        key={index}
                      >
                        Player {index + 1}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            {kickPlayerMode && (
              <>
                <h4 className="choice-message">Kicking player</h4>
                <div className="choice-button-container">
                  {players.map((player, index) => {
                    return player.status === "empty" || player.isHost ? (
                      <button
                        className="choice-button choice-invalid"
                        key={index}
                      >
                        Player {index + 1}
                      </button>
                    ) : (
                      <button
                        className="choice-button"
                        key={index}
                        onClick={(e) => handleKickPlayer(index)}
                      >
                        Player {index + 1}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="room-action-container">
            <button
              className="action-button top-button"
              onClick={(e) => toggleAddBot(e)}
            >
              add bot
            </button>
            <button
              className="action-button"
              onClick={(e) => toggleKickPlayer(e)}
            >
              kick player
            </button>
          </div>
          {players.every((player) => {
            return player.status === "ready";
          }) ? (
            <button className="lobby-button">start game</button>
          ) : (
            <button className="lobby-button choice-invalid">start game</button>
          )}
        </>
      ) : (
        <>
          <div className="room-action-container">
            <button
              className="action-button top-button"
              onClick={(e) => handleReadyPlayer(true)}
            >
              ready
            </button>
            <button
              className="action-button action-button-waiting"
              onClick={(e) => handleReadyPlayer(false)}
            >
              waiting
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomAction;
