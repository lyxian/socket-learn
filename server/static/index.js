const maxRecentUserLog = 7

const NEW = document.getElementById("new");
const APP = document.getElementById("app");


function addMessage(msg) {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

var currentUserId;
var socket = io();

// send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
// socket.on("hello from server", (...args) => {
//     console.log(`Connection to localhost successful by User-${socket.id}`);
//     // ...
// });

// receive a message from the server
socket.on("typing", (isTyping, userId) => {
    var typingUser = document.getElementById(`user_${userId}`);
    if (isTyping) {
        var elem = document.createElement("span");
        elem.innerText = 'typing...';
        if (!typingUser.querySelector('span')) typingUser.appendChild(elem);
    } else {
        var elem = typingUser.querySelector('span');
        if (elem) typingUser.removeChild(elem);
    }
});

// receive a message from the server
socket.on("user connect", (userId, otherUsers) => {
    if (!currentUserId) return;

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

// receive a message from the server
socket.on("chat message", (msg) => {
    addMessage(msg);
});

var form = document.getElementById("form");
var input = document.getElementById("input");

input.addEventListener("keyup", () => {
    socket.emit("typing", input.value.length > 0, currentUserId);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value, currentUserId);
        addMessage(input.value)
        input.value = "";
    }
});

var formName = document.getElementById("formName");
var inputName = document.getElementById("inputName");

formName.addEventListener("submit", function (e) {
    e.preventDefault();
    currentUserId = inputName.value
    if (currentUserId) {
        socket.emit("new username", currentUserId);
        APP.style.display = "flex";
        NEW.style.display = "none";
    }
});
