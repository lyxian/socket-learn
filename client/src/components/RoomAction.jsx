import React, { useState, useContext } from "react";

const RoomAction = ({ user }) => {
  console.log(user);
  console.log(user.isHost);

  return (
    <div className="room-action-container">
      {user.isHost ? (
        <>
          <button>add bot</button>
          <button>start game</button>
        </>
      ) : (
        <>
          <button>ready</button>
          <button>joined</button>
        </>
      )}
    </div>
  );
};

export default RoomAction;
