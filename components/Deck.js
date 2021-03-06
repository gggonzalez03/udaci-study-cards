import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import Card from './Card'
import AddCardForm from './AddCardForm'
import EndQuizMessage from './EndQuizMessage'
import { clearLocalNotification, setLocalNotification } from '../actions/api'
import colors from '../helpers/colors'
import { connect } from 'react-redux'
import { updateScore, updateTimesQuizzed } from '../actions/index';

class Deck extends Component {
  state = {
    addCardFormVisible: false,
    endQuizMessageVisible: false,
    nextFocusIndex: 1,
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.headerTitle,
      headerRight:
      <TouchableWithoutFeedback
        onPress={() => navigation.state.params.setAddCardFormVisible(true)}
      >
        <Entypo name='plus' size={28} style={{ backgroundColor: 'transparent', margin: 8 }} />
      </TouchableWithoutFeedback>
    }
  }
  componentWillMount = () => {
    // Set params in navigation prop so that it can be passed in
    // navigationOptions above.
    this.props.navigation.setParams({
      headerTitle: this.props.navigation.state.params.deck.name,
      setAddCardFormVisible: (visible) => this.setAddCardFormVisible(visible),
    })
  }
  setAddCardFormVisible = (visible) => {
    this.setState({
      addCardFormVisible: visible
    })
  }
  setEndQuizMessageVisible = (visible) => {
    this.setState({
      endQuizMessageVisible: visible
    })
  }
  scrollToIndex = (index) => {
    this.cardList.scrollToIndex({ animated: true, index: "" + index });
  }
  correctPressed = () => {
    let deckKey = this.props.navigation.state.params.deck.id
    let timesQuizzed = this.props.navigation.state.params.deck.timesQuizzed
    // Only move to the next card if there is a next card
    // This will prevent out of bounds error or exception
    if (this.state.nextFocusIndex < this.props.decks[deckKey].cards.length) {
      this.scrollToIndex(this.state.nextFocusIndex)
      this.setState(state => ({
        nextFocusIndex: state.nextFocusIndex + 1
      }))
    }
    else {
      this.props.updateTimesQuizzed(deckKey, timesQuizzed + 1)
      // Clear notification for today and set up a new one for tomorrow
      clearLocalNotification()
        .then(setLocalNotification())
      this.setEndQuizMessageVisible(true)
    }

    this.props.updateScore(this.props.quiz.score + 1)
  }
  incorrectPressed = () => {
    let deckKey = this.props.navigation.state.params.deck.id
    let timesQuizzed = this.props.navigation.state.params.deck.timesQuizzed
    // Only move to the next card if there is a next card
    // This will prevent out of bounds error or exception
    if (this.state.nextFocusIndex < this.props.decks[deckKey].cards.length) {
      this.scrollToIndex(this.state.nextFocusIndex)
      this.setState(state => ({
        nextFocusIndex: state.nextFocusIndex + 1
      }))
    }
    else {
      this.props.updateTimesQuizzed(deckKey, timesQuizzed + 1)
      // Clear notification for today and set up a new one for tomorrow
      clearLocalNotification()
        .then(setLocalNotification())
      this.setEndQuizMessageVisible(true)
    }
  }
  startQuiz = () => {
    // Only move to the next card if there is a next card
    // This will prevent out of bounds error or exception
    if (this.state.nextFocusIndex < this.props.decks[this.props.navigation.state.params.deck.id].cards.length) {
      this.scrollToIndex(this.state.nextFocusIndex)
      this.setState(state => ({
        nextFocusIndex: state.nextFocusIndex + 1
      }))
    }
  }
  endQuiz = () => {
    this.setEndQuizMessageVisible(false)
    this.props.navigation.goBack(null)
  }

  startOver = () => {
    // Start with the first card already opened
    // 1 is the index of the first card and 2 is the index of the
    // next card over.
    this.scrollToIndex(1)
    this.setState(state => ({
      nextFocusIndex: 2
    }))
    this.setEndQuizMessageVisible(false)
  }
  render() {
    let deck = this.props.decks[this.props.navigation.state.params.deck.id]
    const { height, width } = Dimensions.get('window')
    return (
      <View
        style={{ flex: 1 }}
      >
        <FlatList
          ref={(ref) => { this.cardList = ref }}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          data={deck.cards}
          keyExtractor={(card, index) => index}
          renderItem={(card) => (
            <Card
              correctPressed={() => this.correctPressed()}
              incorrectPressed={() => this.incorrectPressed()}
              startQuiz={() => this.startQuiz()}
              deck={deck}
              card={card}
              style={{
                width: width - 32
              }}
            ></Card>
          )}
        />
        <Modal
          visible={this.state.addCardFormVisible}
          animationType={"slide"}
          transparent={true}
        >
          <AddCardForm
            deck={deck}
            afterSubmit={() => {
              this.setAddCardFormVisible(false)
            }}
            afterCancel={() => this.setAddCardFormVisible(false)}
          />
        </Modal>

        {/* End Quiz Message */}
        <Modal
          visible={this.state.endQuizMessageVisible}
          animationType={"slide"}
          transparent={true}
        >
          <EndQuizMessage
            deck={deck}
            onExit={() => this.endQuiz()}
            onStartOver={() => this.startOver()}
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = ({ deck, quiz }) => {
  return {
    decks: deck.decks,
    quiz: {
      ...quiz,
      score: quiz.score,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateScore: (score) => dispatch(updateScore(score)),
    updateTimesQuizzed: (key, timesQuizzed) => dispatch(updateTimesQuizzed(key, timesQuizzed)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)