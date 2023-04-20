const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const roomIdLength = 6;

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
