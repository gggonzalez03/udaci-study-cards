const initialState = {
  deck: {
    decks: {}
  },
  // There will only be one quiz being taken at a time
  quiz: {
    deck: {},
    score: 0,
    maxScore: 0,
  }
}

export default initialState