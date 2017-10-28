import {
  ADD_DECK,
  GET_DECKS,
  ADD_DECK_CARD,
  UPDATE_SCORE,
  UPDATE_TIMES_QUIZZED,
} from '../actions'
import initialState from './initial-state'
import quiz from './quiz'
import { combineReducers } from 'redux'

function deck(state = initialState.deck, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        decks: action.decks,
      }
    case GET_DECKS:
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK_CARD:
      return {
        ...state,
        decks: {
          ...state.decks, [action.key]: {
            ...state.decks[action.key],
            cards: [...state.decks[action.key].cards, {
              question: action.card.question,
              answer: action.card.answer,
            }]
          }
        },
      }
    case UPDATE_SCORE:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          score: action.score,
        }
      }
    case UPDATE_TIMES_QUIZZED:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.key]: {
            ...state.decks[action.key],
            timesQuizzed: action.timesQuizzed,
          }
        },
      }
    default:
      return state
  }
}

export default combineReducers({ deck, quiz })