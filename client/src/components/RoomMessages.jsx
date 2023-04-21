import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { RoomContext } from "./Room";

const RoomMessages = () => {
  const { socket, roomId, players, setPlayers } = useContext(RoomContext);
  const { username } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("send messages", (messageResponse) => {
      setMessages(messageResponse);
    });
  }, [socket]);

  const submitForm = (e) => {
    e.preventDefault();
    const messageObj = {
      id: messages.length,
      user: username,
      value: messageInput,
    };
    const updatedMessages = [...messages, messageObj];
    socket.emit("add message", { updatedMessages, roomId });
    setMessages(updatedMessages);
    setMessageInput("");
  };

  return (
    <div className="room-message-container">
      <div className="message-list">
        {messages.length ? (
          messages
            // .sort((a, b) => a.time - b.time)
            .map((message) => (
              <div key={message.id} className="message-container">
                <span className="message-user">{message.user}</span>
                <span className="message-text"> | {message.value}</span>
              </div>
            ))
        ) : (
          <div className="message-container">
            <span className="message-text">no message yet</span>
          </div>
        )}
      </div>
      <form className="message-form" onSubmit={submitForm}>
        <input
          autoFocus
          value={messageInput}
          placeholder="Type your message"
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default RoomMessages;
