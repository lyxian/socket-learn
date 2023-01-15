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
        origin: `${LOCALHOST}:${CLIENT_PORT}`
    },
    // cors: true,
    // credentials: true
});

function addProduct(nameKey, productsArray, last_bidder, new_price) {
    for (let i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name === nameKey) {
            productsArray[i].last_bidder = last_bidder;
            productsArray[i].price = new_price;
        }
    }
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile(FILE_NAME, stringData, (err) => {
        console.error(err);
    });
    console.log('Added successfully');
}

function removeProduct(nameKey) {
    const products = productData['products'].filter((product) => {
        return product.name != nameKey;
    });
    // method 1
    // const index = productsArray.indexOf(nameKey);
    // console.log(nameKey, index)
    // method 2
    // const removed = productsArray.splice(index, 1); 

    productData['products'] = products
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile(FILE_NAME, stringData, (err) => {
        console.error(err);
    });
    console.log('Removed successfully');
}

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log(`🔥: A user-${socket.id} disconnected`);
    });
    // Handle 'addProduct' event
    socket.on('addProduct', (data) => {
        productData['products'].push(data);
        const stringData = JSON.stringify(productData, null, 2); // indent=2
        fs.writeFile(FILE_NAME, stringData, (err) => {
            console.error(err);
        });

        // Sends back the data after adding a new product
        socket.broadcast.emit('addProductResponse', data);
    });
    // Handle 'bidProduct' event
    socket.on('bidProduct', (data) => {
        // console.log(data)
        addProduct(
            data.name,
            productData['products'],
            data.last_bidder,
            data.amount
        );

        // Sends back the data after placing a bid
        socket.broadcast.emit('bidProductResponse', data);
    });
    // Handle 'removeProduct' event
    socket.on('removeProduct', (data) => {
        // console.log(data)
        removeProduct(
            data.name,
        );

        // Sends back the data after removing a bid
        socket.broadcast.emit('removeProductResponse', data);
    });
});

app.get('/api', (req, res) => {
    res.json(productData);
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});