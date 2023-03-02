const NEW = document.getElementById("new");
const APP = document.getElementById("app");
const SETTINGS = document.getElementById("app_settings");
const GAMEAREA = document.getElementById("app_gameArea");

const button_easy = document.getElementById("select_easy");
const button_hard = document.getElementById("select_hard");
const user_choice = document.getElementById("user_choice");
const user_name = document.getElementById("user_name");

const playerOrder = {
    0: 'top',
    1: 'left',
    2: 'btm',
    3: 'right',
}

var currentUserId;
var socket = io();

// receive a message from the server
socket.on("start game", (hands) => {
    console.log('Game start');
    // hide settings and show hands
    SETTINGS.style.display = "none";
    GAMEAREA.style.display = "flex";

    hands.forEach((hand, idx) => {
        console.log(hand, idx);
        var playerDiv = document.getElementById(playerOrder[idx] + 'Player');
        playerDiv.innerText = hand;
        // var item = document.createElement("li");
        // players.appendChild(item);
    });
})

// receive a message from the server
socket.on("draw end", (hands, message) => {
    console.log('Draw end');

    hands.forEach((hand, idx) => {
        console.log(hand, idx);
        var playerDiv = document.getElementById(playerOrder[idx] + 'Player');
        playerDiv.innerText = hand;
        // var item = document.createElement("li");
        // players.appendChild(item);
    });
    alert(message);
})

// receive a message from the server
socket.on("game end", (player) => {
    console.log('Game end');
    alert(`${player} player lost`);
})

// receive a message from the server
socket.on("user connect", (userId, otherUsers) => {
    if (!currentUserId) return;

    // console.log(`User-${userId} connected`);
    // var item = document.createElement("li");
    // item.id = `user_${userId}`;
    // item.textContent = userId;
    // users.appendChild(item);

    // if (otherUsers) {
    //     var children = users.childNodes;
    //     children.forEach((child) => {
    //         var childId = child.id.split('_')[1];
    //         for (var j = 0; j < otherUsers.length; j++) {
    //             if (otherUsers[j] === childId) {
    //                 var index = otherUsers.indexOf(childId);
    //                 otherUsers.splice(index, 1);
    //             }
    //         }
    //     })
    //     otherUsers.forEach((otherUserId) => {
    //         var otherUser = document.createElement("li");
    //         otherUser.id = `user_${otherUserId}`
    //         otherUser.textContent = otherUserId
    //         users.appendChild(otherUser);
    //     })
    // }

    // var item = document.createElement("li");
    // item.textContent = `${userId} connected`;
    // recent.appendChild(item);

    // while (recent.childElementCount >= maxRecentUserLog) {
    //     recent.removeChild(recent.firstElementChild);
    // }
});

// receive a message from the server
socket.on("user disconnect", (userId) => {
    console.log(`User-${userId} disconnected`)
    // var item = document.getElementById(`user_${userId}`);
    // if (item) {
    //     users.removeChild(item);
    // }

    // var item = document.createElement("li");
    // item.textContent = `${userId} disconnected`;
    // recent.appendChild(item);

    // while (recent.childElementCount >= maxRecentUserLog) {
    //     recent.removeChild(recent.firstElementChild);
    // }
});

const formName = document.getElementById("formName");
const inputName = document.getElementById("inputName");

formName.addEventListener("submit", function (e) {
    e.preventDefault();
    currentUserId = inputName.value
    if (currentUserId) {
        socket.emit("new username", currentUserId);
        APP.style.display = "flex";
        NEW.style.display = "none";
        user_name.innerHTML = `Welcome, <b>${currentUserId}</b>`;
    }
});

button_easy.addEventListener("click", (e) => {
    user_choice.innerText = "You have selected EASY mode";
});
button_hard.addEventListener("click", (e) => {
    user_choice.innerText = "You have selected HARD mode";
});

const formGame = document.getElementById("formGame");

formGame.addEventListener("submit", function (e) {
    e.preventDefault();
    if (user_choice.innerText) {
        var mode = user_choice.innerText.split(' ')[3];
        socket.emit("start game", mode);
    } else {
        alert('No choice selected');
    }
    // currentUserId = inputName.value
    // if (currentUserId) {
    //     socket.emit("new username", currentUserId);
    //     APP.style.display = "flex";
    //     NEW.style.display = "none";
    //     user_name.innerHTML = `Welcome, <b>${currentUserId}</b>`;
    // }
});

const buttonTop = document.getElementById("buttonTop");
const buttonLeft = document.getElementById("buttonLeft");
const buttonRight = document.getElementById("buttonRight");
const buttonPass = document.getElementById("buttonPass");

buttonTop.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("draw top");
});
buttonLeft.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("draw left");
});
buttonRight.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("draw right");
});
buttonPass.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("pass");
});