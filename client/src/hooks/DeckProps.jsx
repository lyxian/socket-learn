import { Deck, deckOrder, Ranks, players } from "../data";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function distributeDeck(deck, handSize) {
  console.log("distribute deck");
  var hand = [];
  for (let i = 0; i < handSize * players.length; i += handSize) {
    hand.push(deck.splice(0, handSize));
  }
  return hand;
}

export function sortHand(hand) {
  return hand.sort((x, y) => {
    if (deckOrder[x] < deckOrder[y]) return -1;
    if (deckOrder[x] > deckOrder[y]) return 1;
    return 0;
  });
}

function randomCardFromHand(hand) {
  return hand[Math.floor(Math.random() * hand.length)];
}

export function queryHand(hand, rank) {
  return hand.filter((card) => {
    return card.includes(rank);
  });
}

export function drawFromDeck(deck) {
  if (deck.length) return deck.splice(0, 1)[0];
  return null;
}

export function hasCompleteSet(hand) {
  const countArray = Array(13).fill(0);
  hand.map((card) => {
    countArray[Ranks.indexOf(card.slice(0, -1))]++;
  });
  const completeSet = countArray
    .map((count, index) => {
      // return { count, index };
      return [count, index];
    })
    .filter((count) => {
      return count[0] === 4;
    })
    .map((count) => {
      return Ranks[count[1]];
    });
  return completeSet;
}

function newGame(deck) {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled;
  // .filter((card) => card !== queenToRemove);
  // let hands = distributeDeck(shuffled);
  // return hands;
}

export const newDeck = newGame(Deck);

// module.exports = { newDeck, drawFromDeck };
