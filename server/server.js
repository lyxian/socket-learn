require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.SERVER_PORT || 4000;

const express = require('express');
const app = express();

// HTTP/CORS for data transfer between client and server
const http = require('http').Server(app);
const cors = require('cors');
const socket = require('socket.io');
app.use(cors());

console.log(`Checking ${LOCALHOST}:${PORT}`)
const socketIO = socket(http, {
    cors: {
        // origin: `${LOCALHOST}:${CLIENT_PORT}`
        origin: "*"
    },
    // cors: true,
    // credentials: true
});

socketIO.on("connection", (socket) => {
    console.log(`user-${socket.id} connected`);

    // send a message to the client
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

    // receive a message from the client
    socket.on("hello from client", (...args) => {
        // ...
    });

    socket.on('chat message', (msg, socketId) => {
        socketIO.emit('chat message', msg);
        console.log(`message by ${socketId}: ` + msg);
    });

    socket.on('disconnect', () => {
        console.log(`user-${socket.id} disconnected`);
    });
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(require('path').dirname(__dirname) + `/public/index.html`);
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});