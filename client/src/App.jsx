import React, { useEffect, useState, createContext } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "./components/Home";
import Room from "./components/Room";
import "./App.css";

const UserContext = createContext();

function App() {
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  // const username = localStorage.getItem("userName");
  // console.log(username);

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:4000`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ username, setUsername, socket, setSocket }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
