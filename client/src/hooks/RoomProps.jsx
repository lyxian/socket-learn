const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const roomIdLength = 6;
const emptyPlayer = { name: "", status: "empty", isBot: false, isHost: false };
const randomBotNames = [
  "Simon",
  "John",
  "Matt",
  "James",
  "Hugo",
  "Mary",
  "Sarah",
  "Sofia",
  "Grace",
  "Zoe",
];

function uniqueRoomId(roomId) {
  // TO-DO
  return true;
}

function randomRoomId() {
  return Array(roomIdLength)
    .fill(0)
    .map(() => {
      return letters[Math.floor(Math.random() * letters.length)];
    })
    .join("");
}

export function getRandomRoomId() {
  let roomId = randomRoomId();
  while (!uniqueRoomId(roomId)) {
    let roomId = randomRoomId();
  }
  return roomId;
}

export function roomExists(roomId) {
  return true;
}

export function addBot(players, index) {
  const newBot = {
    ...emptyPlayer,
    name: randomBotNames[Math.floor(Math.random() * randomBotNames.length)],
    status: "ready",
    isBot: true,
  };
  players[index] = newBot;
  return players;
}

export function kickPlayer(players, index) {
  players[index] = emptyPlayer;
  return players;
}

export function readyPlayer(players, playerName, getReady) {
  const currentPlayer = players.find((player) => {
    return player.name === playerName;
  });
  currentPlayer.status = getReady ? "ready" : "waiting";
  return players;
}
