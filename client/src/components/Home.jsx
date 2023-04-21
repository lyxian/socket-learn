import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Lobby from "./Lobby";
import { UserContext } from "../App";

const Home = () => {
  const { username, setUsername } = useContext(UserContext);
  // const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setHasUsername(true);
    e.preventDefault();
    // localStorage.setItem("username", username);
    // navigate("/products");
  };

  return (
    <>
      {hasUsername ? (
        <Lobby user={username} setHasUsername={setHasUsername} />
      ) : (
        <form className="landing-page-wrapper" onSubmit={handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input
            type="text"
            name="username"
            className="input-text-container"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={1}
          />
          <button className="lobby-button">SIGN IN</button>
        </form>
      )}
    </>
  );
};

export default Home;
