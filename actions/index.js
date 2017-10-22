import * as api from './api'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'


export function getDecks() {
  return function (dispatch) {
    api.getDecks()
      .then(decks => dispatch({
        type: GET_DECKS,
        decks: decks,
      }))
  }
}

export function addDeck() {
  return {
    type: ADD_DECK,
    decks: []
  }
}