import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import socketIO from "socket.io-client";

import Home from "./components/Home";
import Room from "./components/Room";
import "./App.css";

// const socket = socketIO.connect(`${process.env.LOCALHOST}:${process.env.PORT}`);

function App() {
  // const username = localStorage.getItem("userName");
  // console.log(username);

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:4000`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  // return (
  //   <div className="App">
  //     <header className="app-header">React Chat</header>
  //     {socket ? (
  //       <div className="chat-container">
  //         <Messages socket={socket} />
  //         <MessageInput socket={socket} />
  //       </div>
  //     ) : (
  //       <div>Not Connected</div>
  //     )}
  //   </div>
  // );

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import { useParams } from "react-router-dom";
// const { name, price } = useParams();

// return (
//   <Router>
//     <div>
//       {/* Nav is available at the top of all the pages as a navigation bar */}
//       <Navbar socket={socket} />
//       <Routes>
//         <Route
//           path="/"
//           element={username ? <Products socket={socket} /> : <Home />}
//         />
//         <Route path="/products" element={<Products socket={socket} />} />
//         <Route
//           path="/products/add"
//           element={<AddProduct socket={socket} />}
//         />
//         {/* Uses dynamic routing */}
//         <Route
//           path="/products/bid/:name/:price"
//           element={<BidProduct socket={socket} />}
//         />
//       </Routes>
//     </div>
//   </Router>
// );
