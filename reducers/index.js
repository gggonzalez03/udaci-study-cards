import { ADD_DECK, GET_DECKS, ADD_DECK_CARD } from '../actions'
import initialState from './initial-state'

function index(state = initialState.deck, action) {
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
        decks: {...state.decks, [action.key]: {
          ...state.decks[action.key],
          cards: [...state.decks[action.key].cards, {
            question: action.card.question,
            answer: action.card.answer,
          }]
        }},
      }
    default:
      return state
  }
}

export default index