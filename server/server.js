require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.CLIENT_PORT || 3000;

const express = require('express');
const app = express();

// HTTP/CORS for data transfer between client and server
const http = require('http').Server(app);
const cors = require('cors');
const socket = require('socket.io');
app.use(cors());

app.use(express.static('public'));

console.log(`Checking ${LOCALHOST}:${PORT}`)
const socketIO = socket(http, {
    cors: {
        // origin: `${LOCALHOST}:${CLIENT_PORT}`
        origin: "*"
    },
    // cors: true,
    // credentials: true
});

var users = []

socketIO.on("connection", (socket) => {
    socket.on("new username", (username) => {
        // console.log(username);
        socketIO.emit('user connect', username, users);
        console.log(`user-${username} connected`);
        users.push(username);
        console.log(users);
    });

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
        const index = users.indexOf(socket.id);
        users.splice(index, 1);
        socketIO.emit('user disconnect', socket.id);
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