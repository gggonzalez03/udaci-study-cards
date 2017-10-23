import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import Card from './Card'
import AddCardForm from './AddCardForm'
import colors from '../helpers/colors'
import { connect } from 'react-redux'

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
    // Only move to the next card if there is a next card
    // This will prevent out of bounds error or exception
    if (this.state.nextFocusIndex < this.props.decks[this.props.navigation.state.params.deck.id].cards.length) {
      this.scrollToIndex(this.state.nextFocusIndex)
      this.setState(state => ({
        nextFocusIndex: state.nextFocusIndex + 1
      }))
    }
    else {
      /**
       * TODO:
       * Pop up a modal saying the quiz as ended
       */
      this.setEndQuizMessageVisible(true)
    }
  }
  incorrectPressed = () => {
    // Only move to the next card if there is a next card
    // This will prevent out of bounds error or exception
    if (this.state.nextFocusIndex < this.props.decks[this.props.navigation.state.params.deck.id].cards.length) {
      this.scrollToIndex(this.state.nextFocusIndex)
      this.setState(state => ({
        nextFocusIndex: state.nextFocusIndex + 1
      }))
    }
    else {
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
    this.props.navigation.goBack(null)
  }
  confirmEndQuiz = () => {
    this.setEndQuizMessageVisible(false)
    this.endQuiz()
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
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors[deck.color].dark }}
          >
            <View
              style={{
                position: 'absolute',
                top: 22,
                right: 8,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.confirmEndQuiz()
                }}
              >
                <Entypo name='circle-with-cross' size={28} style={{
                  color: 'white',
                  backgroundColor: 'transparent',
                  margin: 8
                }} />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{ alignItems: 'center' }}
            >
              <Ionicons name='md-checkmark-circle-outline' size={180} style={{
                color: 'white',
                backgroundColor: 'transparent',
                margin: 8
              }} />
              <Text style={{ color: 'white', fontSize: 28, marginBottom: 8 }}>You scored 2/12</Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors[deck.color].extraLight,
                  margin: 4,
                  padding: 4,
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.confirmEndQuiz()
                }}
              >
                <Text style={{ fontSize: 24, color: colors[deck.color].extraLight }}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (deck) => {
  return {
    decks: deck.decks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)