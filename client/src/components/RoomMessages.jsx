import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const RoomMessages = () => {
  const { username } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const [messageInput, setMessageInput] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    // socket.emit("message", value);
    const messageObj = {
      id: messages.length,
      user: username,
      value: messageInput,
    };
    // console.log(messageObj);
    setMessages([...messages, messageObj]);
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
