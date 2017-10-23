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
    cards: [{ cardCover: true }], // Automatically add the cover card as soon as the deck is created
    color: Object.entries(colors)[Math.floor(Math.random() * (Object.values(colors).length - 1))][0] // Get a random color from colors
  }
  AsyncStorage.setItem(key, JSON.stringify(deck))

  return new Promise((resolve, reject) => {
    resolve(deck)
  })
}

export function getDecks() {
  return AsyncStorage.getAllKeys((err, keys) => keys)
    .then(keys => AsyncStorage.multiGet(keys))
    .then(stores => {
      let formattedStores = {}
      stores.map(deck => {
        formattedStores[JSON.parse(deck[1]).id] = {
          id: JSON.parse(deck[1]).id,
          name: JSON.parse(deck[1]).name,
          cards: JSON.parse(deck[1]).cards,
          color: JSON.parse(deck[1]).color,
        }
      })

      // Return a promise
      return new Promise((resolve, reject) => {
        /**
         * TODO:
         * Add conditions and rejection
         */
        resolve(formattedStores)
      })
    })
}

export function getDeckCards(key, callback) {
  AsyncStorage.getItem(key, (err, deck) => {
    let cards = JSON.parse(deck).cards
    callback(cards)
  })
}

export function addDeckCard(key, card) {
  return AsyncStorage.getItem(key, (err, deck) => deck)
    .then(deck => {

      // Format back to json to manipulate data
      let cards = JSON.parse(deck).cards
      cards = [...cards, card]

      // Format back to string to conform with mergeItem
      AsyncStorage.mergeItem(key, JSON.stringify({ cards: cards }))


      // Return a promuse to be resolved by outside callers
      return new Promise((resolve, reject) => {
        /**
         * TODO:
         * Add conditions and rejection
         */
        resolve({ key: key, card: card })
      })
    })
}