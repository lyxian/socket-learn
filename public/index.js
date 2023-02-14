const maxRecentUserLog = 7

const NEW = document.getElementById("new");
const APP = document.getElementById("app");

var socket = io();

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
    console.log(`Connection to localhost successful by User-${socket.id}`);
    // ...
});

// receive a message from the server
socket.on("user connect", (userId, otherUsers) => {

    console.log(`User-${userId} connected`);
    var item = document.createElement("li");
    item.id = `user_${userId}`;
    item.textContent = userId;
    users.appendChild(item);

    if (otherUsers) {
        var children = users.childNodes;
        children.forEach((child) => {
            var childId = child.id.split('_')[1];
            for (var j = 0; j < otherUsers.length; j++) {
                if (otherUsers[j] === childId) {
                    var index = otherUsers.indexOf(childId);
                    otherUsers.splice(index, 1);
                }
            }
        })
        otherUsers.forEach((otherUserId) => {
            var otherUser = document.createElement("li");
            otherUser.id = `user_${otherUserId}`
            otherUser.textContent = otherUserId
            users.appendChild(otherUser);
        })
    }

    var item = document.createElement("li");
    item.textContent = `${userId} connected`;
    recent.appendChild(item);

    while (recent.childElementCount >= maxRecentUserLog) {
        recent.removeChild(recent.firstElementChild);
    }
});

// receive a message from the server
socket.on("user disconnect", (userId) => {
    console.log(`User-${userId} disconnected`)
    var item = document.getElementById(`user_${userId}`);
    if (item) {
        users.removeChild(item);
    }

    var item = document.createElement("li");
    item.textContent = `${userId} disconnected`;
    recent.appendChild(item);

    while (recent.childElementCount >= maxRecentUserLog) {
        recent.removeChild(recent.firstElementChild);
    }
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

var formName = document.getElementById("formName");
var inputName = document.getElementById("inputName");

formName.addEventListener("submit", function (e) {
    e.preventDefault();
    userId = inputName.value
    if (userId) {
        socket.emit("new username", userId);
        APP.style.display = "flex";
        NEW.style.display = "none";
        // socket.on("user connect", (userId, otherUsers) => {
        //     console.log(`User-${userId} connected`);
        //     var item = document.createElement("li");
        //     item.id = `user_${userId}`;
        //     item.textContent = userId;
        //     users.appendChild(item);

        //     if (otherUsers) {
        //         var children = users.childNodes;
        //         children.forEach((child) => {
        //             var childId = child.id.split('_')[1];
        //             for (var j = 0; j < otherUsers.length; j++) {
        //                 if (otherUsers[j] === childId) {
        //                     var index = otherUsers.indexOf(childId);
        //                     otherUsers.splice(index, 1);
        //                 }
        //             }
        //         })
        //         otherUsers.forEach((otherUserId) => {
        //             var otherUser = document.createElement("li");
        //             otherUser.id = `user_${otherUserId}`
        //             otherUser.textContent = otherUserId
        //             users.appendChild(otherUser);
        //         })
        //     }

        //     var item = document.createElement("li");
        //     item.textContent = `${userId} connected`;
        //     recent.appendChild(item);

        //     while (recent.childElementCount >= maxRecentUserLog) {
        //         recent.removeChild(recent.firstElementChild);
        //     }
        // });
    }
});

socket.on("chat message", function (msg) {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});