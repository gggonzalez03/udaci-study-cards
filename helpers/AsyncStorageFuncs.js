import { AsyncStorage } from 'react-native'
import colors from '../helpers/colors'

const STORE = 'UdaciStudyCards'

function generateID() {
  return Math.random().toString(36).substr(2, 16)
}

export function addDeck(deckName) {
  // Supply additional data to the new deck
  const key = `${STORE}:${generateID()}`
  const deck = {
    id: key,
    name: deckName,
    cards: [],
    color: Object.entries(colors)[Math.floor(Math.random() * (Object.values(colors).length - 1))][0] // Get a random color from colors
  }
  AsyncStorage.setItem(key, JSON.stringify(deck))
}

export function getDecks(callback) {
  AsyncStorage.getAllKeys((err, keys) => {

    // Format the data
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores = stores.map(deck => {
        return {
          id: JSON.parse(deck[1]).id,
          name: JSON.parse(deck[1]).name,
          cards: JSON.parse(deck[1]).cards,
          color: JSON.parse(deck[1]).color,
        }
      })
      callback(stores)
    })
  })
}

export function getDeckCards(key, callback) {
  AsyncStorage.getItem(key, (err, deck) => {
    let cards = JSON.parse(deck).cards
    callback(cards)
  })
}

export function addCardToDeck(key, card) {
  AsyncStorage.getItem(key, (err, deck) => {
    /**
     * Get deck cards
     * Combine deck cards with the new card
     * Merge cards in the deck
     */
    let cards = JSON.parse(deck).cards
    cards = [...cards, card]
    AsyncStorage.mergeItem(key, JSON.stringify({ cards: cards }))
  })
}