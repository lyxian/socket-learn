const NEW = document.getElementById("new");
const APP = document.getElementById("app");

const button_easy = document.getElementById("select_easy");
const button_hard = document.getElementById("select_hard");
const user_choice = document.getElementById("user_choice");
const user_name = document.getElementById("user_name");

var currentUserId;
var socket = io();

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
        alert(mode);
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