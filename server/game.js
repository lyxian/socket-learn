const Ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const Suits = ['♦', '♣', '♥', '♠']

const Deck = Ranks.flatMap(rank => Suits.map(suit => rank + suit))

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomQueen() {
    return 'Q' + Suits[Math.floor(Math.random() * 4)];
}

const queenToRemove = randomQueen()
let shuffled = Deck
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .filter(card => card !== queenToRemove)

// console.log(shuffled, shuffled.length)

function distributeDeck(deck) {
    var hand = [];
    const handSize = 13;
    for (let i = 0; i < deck.length; i += handSize) {
        hand.push(deck.slice(i, i + handSize));
    }
    return hand
}

let hands = distributeDeck(shuffled)

const mapper = (val, idx) => ({ [val]: idx });
const deckOrder = Object.assign(...Deck.map(mapper));

function sortHand(hand) {
    return hand.sort((x, y) => {
        if (deckOrder[x] < deckOrder[y]) return -1
        if (deckOrder[x] > deckOrder[y]) return 1
        return 0
    })
}
// console.log(sortHand(hands[0]))

function removePairs(hand) {
    var ranks = hand.map(val => val[0])
    var counts = {};
    for (var i = 0, l = ranks.length; i < l; i++) {
        counts[ranks[i]] = (counts[ranks[i]] || 0) + 1;
    }

    // console.log(counts)
    var remainingRanks = [... new Set(ranks.filter(function (item) {
        return ![2, 4].includes(counts[item]);
    }))]
    hand = hand.filter(val => remainingRanks.includes(val[0]))

    var indexToRemove = []
    for (var i = 0, l = hand.length - 2; i < l; i++) {
        if (hand[i][0] == hand[i + 2][0]) {
            indexToRemove.push(i)
        }
    }
    for (idx of indexToRemove) {
        hand.splice(idx, 2)
    }
    return hand
}

hands = hands.map(hand => removePairs(sortHand(hand)))
module.exports = hands;

// const winningArray = [
//     [35, 36, 37, 38],
//     [36, 37, 38, 39],
//     [37, 38, 39, 40],
//     [38, 39, 40, 41],
//     [42, 43, 44, 45],
//     [43, 45, 46, 47],
//     [44, 46, 47, 48],
//     [46, 47, 48, 49],
// ]

// export default winningArray;