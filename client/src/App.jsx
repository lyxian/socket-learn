import React, { Component } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import socketIO from "socket.io-client";
const socket = socketIO.connect(`${process.env.LOCALHOST}:${process.env.PORT}`);

import Button from "./components/Button";
import AddProduct from "./components/AddProduct";
import BidProduct from "./components/BidProduct";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
    <Router>
      <div>
        {/* Nav is available at the top of all the pages as a navigation bar */}
        <Navbar socket={socket} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/add"
            element={<AddProduct socket={socket} />}
          />
          {/* Uses dynamic routing */}
          <Route
            path="/products/bid/:name/:price"
            element={<BidProduct socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
