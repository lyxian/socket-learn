require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.CLIENT_PORT || 3000;
const { Deck, drawFromHand, newGame } = require('./game');

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

const playerOrder = {
    0: 'top',
    1: 'left',
    2: 'btm',
    3: 'right',
    top: 0,
    left: 1,
    btm: 2,
    right: 3,
}
const sequence = ['left', 'top', 'right']
let message, randomCard

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
        hands = newGame(Deck);
        console.log(`Starting ${mode} mode...`)
        socket.emit('start game', hands);
    })

    socket.on('pass', () => {
        // random draw
        sequence.forEach((player) => {
            if (hands[playerOrder[player]].length) {
                idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                otherPlayer = playerOrder[idx];
                [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                while (!randomCard) {
                    idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                    otherPlayer = playerOrder[idx];
                    [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                }
                message = `${player} player picked ${randomCard} from ${playerOrder[idx]} player`
                console.log(message);
                socket.emit('draw end', hands, message);
            }
        })
    })
    socket.on('draw top', () => {
        if (hands[playerOrder['top']].length) {
            [hands[playerOrder['btm']], hands[playerOrder['top']], randomCard] = drawFromHand(hands[playerOrder['btm']], hands[playerOrder['top']]);
            message = `You picked ${randomCard} from top player`
            console.log(message);
            socket.emit('draw end', hands, message);

            // random draw
            sequence.forEach((player) => {
                if (hands[playerOrder[player]].length) {
                    idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                    otherPlayer = playerOrder[idx];
                    [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    while (!randomCard) {
                        idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                        otherPlayer = playerOrder[idx];
                        [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    }
                    message = `${player} player picked ${randomCard} from ${playerOrder[idx]} player`
                    console.log(message);
                    socket.emit('draw end', hands, message);
                }
            })
        } else {
            console.log('invalid move');
        }
    })
    socket.on('draw left', () => {
        if (hands[playerOrder['left']].length) {
            [hands[playerOrder['btm']], hands[playerOrder['left']], randomCard] = drawFromHand(hands[playerOrder['btm']], hands[playerOrder['left']]);
            message = `You picked ${randomCard} from left player`
            console.log(message);
            socket.emit('draw end', hands, message);

            // random draw
            sequence.forEach((player) => {
                if (hands[playerOrder[player]].length) {
                    idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                    otherPlayer = playerOrder[idx];
                    [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    while (!randomCard) {
                        idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                        otherPlayer = playerOrder[idx];
                        [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    }
                    message = `${player} player picked ${randomCard} from ${playerOrder[idx]} player`
                    console.log(message);
                    socket.emit('draw end', hands, message);
                }
            })
        } else {
            console.log('invalid move');
        }
    })
    socket.on('draw right', () => {
        if (hands[playerOrder['right']].length) {
            [hands[playerOrder['btm']], hands[playerOrder['right']], randomCard] = drawFromHand(hands[playerOrder['btm']], hands[playerOrder['right']]);
            message = `You picked ${randomCard} from right player`
            console.log(message);
            socket.emit('draw end', hands, message);

            // random draw
            sequence.forEach((player) => {
                if (hands[playerOrder[player]].length) {
                    idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                    otherPlayer = playerOrder[idx];
                    [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    while (!randomCard) {
                        idx = Array.from({ length: 4 }, (_, i) => i).filter(val => val !== playerOrder[player])[Math.floor(Math.random() * 3)];
                        otherPlayer = playerOrder[idx];
                        [hands[playerOrder[player]], hands[playerOrder[otherPlayer]], randomCard] = drawFromHand(hands[playerOrder[player]], hands[playerOrder[otherPlayer]]);
                    }
                    message = `${player} player picked ${randomCard} from ${playerOrder[idx]} player`
                    console.log(message);
                    socket.emit('draw end', hands, message);
                }
            })
        } else {
            console.log('invalid move');
        }
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