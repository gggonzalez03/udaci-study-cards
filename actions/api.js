import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import colors from '../helpers/colors'

const STORE = 'UdaciStudyCards'
const NOTIFICATION = 'UdaciStudyCards:notification'

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

// Return an object to use for notification creation
function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "👋 don't forget to refresh your memory!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  return AsyncStorage.getItem(NOTIFICATION)
    .then(JSON.parse)
    .then((data) => {
      /**
       * Only if there is no notification set for the day:
       * Ask for permission
       * Clear notifications just in case
       * Then set a new notification for the next day
       */
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION, JSON.stringify(true))
            }
          })
      }
    })
}