import { Deck } from "../data";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function distributeDeck(deck) {
  var hand = [];
  const handSize = 13;
  for (let i = 0; i < deck.length; i += handSize) {
    hand.push(deck.slice(i, i + handSize));
  }
  return hand;
}

function sortHand(hand) {
  return hand.sort((x, y) => {
    if (deckOrder[x] < deckOrder[y]) return -1;
    if (deckOrder[x] > deckOrder[y]) return 1;
    return 0;
  });
}

function randomCardFromHand(hand) {
  return hand[Math.floor(Math.random() * hand.length)];
}

export function drawFromDeck(deck) {
  return deck.splice(0, 1)[0];
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
