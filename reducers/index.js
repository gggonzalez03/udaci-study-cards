import { ADD_DECK, GET_DECKS } from '../actions'
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
    default:
      return state
  }
}

export default index