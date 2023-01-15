import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ socket }) => {
  console.log("Storage");
  console.log(localStorage);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  //Listens after a product is added
  useEffect(() => {
    socket.on("addProductResponse", (data) => {
      setNotification(
        `@${data.owner} just added ${data.name} worth $${Number(
          data.price
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  //Listens after a user places a bid
  useEffect(() => {
    socket.on("bidProductResponse", (data) => {
      setNotification(
        `@${data.last_bidder} just bid ${data.name} for $${Number(
          data.amount
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  //Listens after a user places a bid
  useEffect(() => {
    socket.on("removeProductResponse", (data) => {
      setNotification(`@${data.user} just remove item ${data.name}`);
    });
  }, [socket]);

  const logoutBtn = (username) => {
    console.log(`logging out ${username}`);
    // localStorage.removeItem(username);
    localStorage.clear();
    console.log(localStorage);
    navigate("/");
    // location.reload();
  };

  const username = localStorage.getItem("userName");
  const title = username ? (
    <h2>Bid Items (user={username})</h2>
  ) : (
    <h2>Bid Items</h2>
  );
  return (
    <nav className="navbar">
      <div className="header">{title}</div>
      <div>
        <p style={{ color: "red" }}>{notification}</p>
      </div>
      {username ? (
        <div className="header-logout">
          <button onClick={() => logoutBtn(username)}>Log Out</button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
