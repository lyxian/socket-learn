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

function distributeDeck(deck) {
    var hand = [];
    const handSize = 13;
    for (let i = 0; i < deck.length; i += handSize) {
        hand.push(deck.slice(i, i + handSize));
    }
    return hand
}

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
    // console.log(hand);
    var ranks = hand.map(val => val ? val[0] : null);
    var counts = {};
    for (var i = 0, l = ranks.length; i < l; i++) {
        counts[ranks[i]] = (counts[ranks[i]] || 0) + 1;
    }

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
    for (idx of indexToRemove.reverse()) {
        hand.splice(idx, 2)
    }
    return hand
}

console.log(newGame(Deck))

function randomCardFromHand(hand) {
    return hand[Math.floor(Math.random() * hand.length)];
}

function drawFromHand(ownHand, otherHand) {
    if (otherHand.length) {
        var randomCard = randomCardFromHand(otherHand);
        // console.log(`Taking ${randomCard}`);
        ownHand.push(randomCard);
        otherHand = otherHand.filter(card => card !== randomCard);
        ownHand = removePairs(sortHand(ownHand));
        return [ownHand, otherHand, randomCard]
    }
    console.log(otherHand);
    return [ownHand, otherHand, false]
}

// console.log(hands[0], hands[1]);
// [hands[0], hands[1]] = drawFromHand(hands[0], hands[1])
// console.log(hands[0], hands[1]);

// console.log(Array.from({ length: 5 }, (_, i) => i + 1));
// console.log(Array(10).fill(1).map((_, i) => i + 1))

function newGame(Deck) {
    const queenToRemove = randomQueen()
    let shuffled = Deck
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .filter(card => card !== queenToRemove)
    let hands = distributeDeck(shuffled)
    hands = hands.map(hand => removePairs(sortHand(hand)))
    return hands
}

function playerLost(hand) {
    return hand.length === 1 && hand[0][0] === 'Q';
}

module.exports = { Deck, drawFromHand, newGame, playerLost };

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