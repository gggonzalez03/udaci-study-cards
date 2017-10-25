import { UPDATE_SCORE, UPDATE_MAX_SCORE, START_QUIZ } from '../actions'
import initialState from './initial-state'

function quiz(state = initialState.quiz, action) {
    switch (action.type) {
        case START_QUIZ:
            return {
                ...state,
                deck: action.deck,
            }
        case UPDATE_SCORE:
            return {
                ...state,
                score: action.score,
            }
        case UPDATE_MAX_SCORE:
            return {
                ...state,
                maxScore: action.score,
            }
        default:
            return state
    }
}

export default quiz