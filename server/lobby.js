var fs = require('fs');

function JsonToFile(data) {
    ;
    fs.writeFile('server/data.json', JSON.stringify(data, null, space = 2), 'utf8', function (err) {
        if (err) throw err;
        console.log('db updated');
    });
    // fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    //     if (err){
    //         console.log(err);
    //     } else {
    //     obj = JSON.parse(data); //now it an object
    //     obj.table.push({id: 2, square:3}); //add some data
    //     json = JSON.stringify(obj); //convert it back to json
    //     fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
    // }});
}

function startConnection(socketIO, db) {
    socketIO.on('connection', (socket) => {
        console.log(`⚡: A user-${socket.id} just connected!`);
        socket.on('disconnect', () => {
            console.log(`🔥: A user-${socket.id} disconnected`);
            db.players = db.players.filter((player) => {
                return player.uid !== socket.id
            })
            JsonToFile(db);
        });

        socket.on('new user', (name) => {
            db.players.push({
                uid: socket.id, name,
            })
            JsonToFile(db);
        });

        socket.on('new room', (info) => {
            socket.join(info.roomId)
            db.lobbies.push({
                roomId: info.roomId, players: [{ name: info.user, status: "ready", isBot: false, isHost: true }, ...Array(3).fill().map((_) => { return { name: "", status: "empty", isBot: false, isHost: false } })],
                game: {},
                messages: [],
            })
            JsonToFile(db);
        });

        socket.on('join room', (info) => {
            const lobby = db.lobbies.find((lobby) => {
                return lobby.roomId === info.roomId
            })
            if (lobby !== null) {
                socket.join(info.roomId)
                let emptySeat = lobby.players.find((player) => {
                    return player.status === "empty"
                })
                if (emptySeat !== null) {
                    emptySeat.name = info.user
                    emptySeat.status = "waiting"
                    JsonToFile(db);
                    socket.to(info.roomId).emit('send players', lobby.players)
                    return;
                }
                console.log('room full')
                socket.emit('room full')
                return;
            }
            console.log('room invalid')
            socket.emit('room invalid')
            return;
        });

        socket.on('get players', (roomId) => {
            console.log("send players -", roomId)
            const lobby = db.lobbies.find((room) => {
                return room.roomId === roomId
            })
            socket.emit('send players', lobby.players)
        });

        socket.on('ready player', (info) => {
            const lobby = db.lobbies.find((room) => {
                return room.roomId === info.roomId
            })
            if (lobby !== null) {
                let currentPlayer = lobby.players.find((player) => {
                    return player.name === info.user
                })
                currentPlayer.status = info.getReady ? "ready" : "waiting";
                JsonToFile(db);
                socket.to(info.roomId).emit('send players', lobby.players)
                return;
            }
            console.log('room invalid')
            socket.emit('room invalid')
            return;
        });

        socket.on('add bot', (info) => {
            const lobby = db.lobbies.find((room) => {
                return room.roomId === info.roomId
            })
            if (lobby !== null) {
                lobby.players = info.updatedPlayers
                JsonToFile(db);
                socket.to(info.roomId).emit('send players', lobby.players)
                return;
            }
            console.log('room invalid')
            socket.emit('room invalid')
            return;
        });

        socket.on('kick player', (info) => {
            const lobby = db.lobbies.find((room) => {
                return room.roomId === info.roomId
            })
            if (lobby !== null) {
                lobby.players = info.updatedPlayers
                JsonToFile(db);
                socket.to(info.roomId).emit('send players', lobby.players)
                return;
            }
            console.log('room invalid')
            socket.emit('room invalid')
            return;
        });

        socket.on('add message', (info) => {
            const lobby = db.lobbies.find((room) => {
                return room.roomId === info.roomId
            })
            if (lobby !== null) {
                lobby.messages = info.updatedMessages
                JsonToFile(db);
                console.log("send messages -", info.roomId)
                socket.to(info.roomId).emit('send messages', lobby.messages)
                return;
            }
            console.log('room invalid')
            socket.emit('room invalid')
            return;
        });
    });
}

module.exports = startConnection;

// socket.broadcast.emit('addProductResponse', data);

// const uuidv4 = require('uuid').v4;

// const messages = new Set();
// const users = new Map();

// const defaultUser = {
//     id: 'anon',
//     name: 'Anonymous',
// };

// const messageExpirationTimeMS = 5 * 60 * 1000;

// class Connection {
//     constructor(io, socket) {
//         this.socket = socket;
//         this.io = io;

//         socket.on('getMessages', () => this.getMessages());
//         socket.on('message', (value) => this.handleMessage(value));
//         socket.on('disconnect', () => this.disconnect());
//         socket.on('connect_error', (err) => {
//             console.log(`connect_error due to ${err.message}`);
//         });
//     }

//     sendMessage(message) {
//         this.io.sockets.emit('message', message);
//     }

//     getMessages() {
//         messages.forEach((message) => this.sendMessage(message));
//     }

//     handleMessage(value) {
//         const message = {
//             id: uuidv4(),
//             user: users.get(this.socket) || defaultUser,
//             value,
//             time: Date.now()
//         };

//         messages.add(message);
//         this.sendMessage(message);

//         setTimeout(
//             () => {
//                 messages.delete(message);
//                 this.io.sockets.emit('deleteMessage', message.id);
//             },
//             messageExpirationTimeMS,
//         );
//     }

//     disconnect() {
//         users.delete(this.socket);
//     }
// }

// function chat(io) {
//     io.on('connection', (socket) => {
//         new Connection(io, socket);
//     });
// };

// module.exports = chat;