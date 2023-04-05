export const sampleCards = [
    '4♠', 'K♥', 'A♣', 'J♠', '10♦'
]

export const players = [
    'you', 'bot_1', 'bot_2', 'bot_3'
]

const Ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const Suits = ['♦', '♣', '♥', '♠']
export const Deck = Ranks.flatMap(rank => Suits.map(suit => rank + suit))

const mapper = (val, idx) => ({ [val]: idx })
export const deckOrder = Object.assign(...Deck.map(mapper))