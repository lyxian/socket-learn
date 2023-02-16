require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.CLIENT_PORT || 3000;
const hands = require('./game');

const express = require('express');
const app = express();

// HTTP/CORS for data transfer between client and server
const http = require('http').Server(app);
const cors = require('cors');
const socket = require('socket.io');
app.use(cors());

app.use(express.static('server/static'));

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
var sockets = {}

socketIO.on("connection", (socket) => {
    socket.on("new username", (username) => {
        // console.log(username);
        socketIO.emit('user connect', username, users);
        console.log(`user-${username} connected`);
        users.push(username);
        sockets[socket.id] = username;
        console.log(users, sockets);
    });

    socket.on('start game', (mode) => {
        console.log(`Starting ${mode} mode...`)
        socketIO.emit('start game', hands);
    })

    socket.on('typing', (isTyping, userId) => {
        if (isTyping) {
            socket.broadcast.emit('typing', isTyping, userId);
            // console.log(`${userId} is typing`);
        } else {
            socket.broadcast.emit('typing', isTyping, userId);
        }
    });

    socket.on('chat message', (msg, userId) => {
        socket.broadcast.emit('chat message', msg);
        // socketIO.emit('chat message', msg);
        console.log(`message by ${userId}: ` + msg);
    });

    socket.on('disconnect', () => {
        username = sockets[socket.id];
        if (username) {
            const index = users.indexOf(username);
            users.splice(index, 1);
            socketIO.emit('user disconnect', username);
            console.log(`user-${username} disconnected`);
            delete sockets[socket.id];
            console.log(users, sockets);
        } else {
            console.log(socket.id + ' not in list');
        }
    });
});

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/templates/index.html');
    // res.sendFile(__dirname + '/templates/game0.html');
    res.sendFile(__dirname + '/templates/game.html');
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});