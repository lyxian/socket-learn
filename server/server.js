require('dotenv').config();
const LOCALHOST = process.env.LOCALHOST;
const PORT = process.env.SERVER_PORT || 4000;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

const express = require('express');
const app = express();

// HTTP/CORS for data transfer between client and server
const http = require('http').Server(app);
const cors = require('cors');
const socket = require('socket.io')

app.use(cors());

console.log(`${LOCALHOST}:${PORT}`)
const socketIO = socket(http, {
    cors: {
        origin: `${LOCALHOST}:${CLIENT_PORT}`
    },
    // cors: true,
    // credentials: true
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log(`🔥: A user-${socket.id} disconnected`);
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// const mongoString = process.env.DATABASE_URL;    // DATABASE_URL from .env = <CONN_STRING>/<DATABASE_NAME>
// const port = process.env.PORT || 6379;

// const routes = require('./routes');
// const express = require('express');
// const mongoose = require('mongoose');
// var cors = require('cors');

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error);
// })

// database.once('connected', () => {
//     console.log('Database connected');
// })

// const app = express();

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());

// app.use('/api', routes);    // set route endpoints to start from '/api'

// app.listen(port, () => {
//     console.log(`Server started at ${port}`);
// })
