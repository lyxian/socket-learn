require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.SERVER_PORT || 4000;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const FILE_NAME = 'server/data.json'

const express = require('express');
const app = express();

// HTTP/CORS for data transfer between client and server
const http = require('http').Server(app);
const cors = require('cors');
const socket = require('socket.io');
const fs = require('fs');

// Retrieve JSON data and parse into JavaScript object
const rawData = fs.readFileSync(FILE_NAME);
const productData = JSON.parse(rawData);

app.use(cors());

console.log(`Checking ${LOCALHOST}:${PORT}`)
const socketIO = socket(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
    // cors: true,
    // credentials: true
});

var chat = require('./chat');
chat(socketIO);

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});