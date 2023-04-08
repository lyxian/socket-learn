export function randomAvailableRank(ranks) {
  const availableRanks = ranks
    .filter((rank) => {
      return rank[1];
    })
    .map((rank) => {
      return rank[0];
    });

  return randomFromArray(availableRanks);
}

export function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
