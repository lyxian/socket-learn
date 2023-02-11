var socket = io();

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    console.log(`Connection to localhost successful by User-${socket.id}`);
    // ...
});

var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value, socket.id);
        input.value = "";
    }
});

socket.on("chat message", function (msg) {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});