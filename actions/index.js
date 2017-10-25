import * as api from './api'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'
export const START_QUIZ = 'START_QUIZ'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const UPDATE_MAX_SCORE = 'UPDATE_MAX_SCORE'


export function getDecks() {
  return function (dispatch) {
    api.getDecks()
      .then(decks => dispatch({
        type: GET_DECKS,
        decks: decks,
      }))
  }
}

export function addDeck(deckName) {
  return function (dispatch) {
    api.addDeck(deckName)
      .then(deck => dispatch({
        type: ADD_DECK,
        deck: deck,
      }))
  }
}

export function addDeckCard(key, card) {
  return function (dispatch) {
    api.addDeckCard(key, card)
      .then(card => dispatch({
        type: ADD_DECK_CARD,
        card: card.card,
        key: card.key,
      }))
  }
}

export function startQuiz(deck) {
  return {
    type: START_QUIZ,
    deck: deck,
  }
}

export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    score: score,
  }
}

export function updateMaxScore(score) {
  return {
    type: UPDATE_MAX_SCORE,
    score: score,
  }
}