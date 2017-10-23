import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../helpers/colors'
import { addCardToDeck } from '../helpers/api'
import { addDeckCard } from '../actions'
import { connect } from 'react-redux'

class AddCardForm extends Component {
  state = {
    question: '',
    answer: '',
  }

  changeQuestion = (question) => {
    this.setState({ question: question })
  }

  changeAnswer = (answer) => {
    this.setState({ answer: answer })
  }

  cancel = () => {
    this.props.afterCancel()
  }

  submit = () => {
    this.props.addDeckCard(this.props.deck.id, {
      question: this.state.question,
      answer: this.state.answer,
    })
    this.props.afterSubmit()
  }

  render() {

    const { deck } = this.props
    const { question, answer } = this.state

    return (
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
              this.cancel()
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
          style={{}}
        >
          <Text style={{
            fontSize: 48,
            color: colors[deck.color].extraLight,
            margin: 4,
            textAlign: 'center',
          }}>New Card Question
        </Text>
          <TextInput
            style={{
              fontSize: 24,
              color: colors[deck.color].extraLight,
              borderWidth: 1, borderRadius: 5,
              borderColor: colors[deck.color].extraLight,
              margin: 4,
              padding: 4,
            }}
            autoFocus={false}
            onChangeText={(question) => this.changeQuestion(question)}
            value={question}
          ></TextInput>
          <Text style={{
            fontSize: 48,
            color: colors[deck.color].extraLight,
            margin: 4,
            textAlign: 'center',
          }}>New Card Answer
        </Text>
          <TextInput
            style={{
              fontSize: 24,
              color: colors[deck.color].extraLight,
              borderWidth: 1, borderRadius: 5,
              borderColor: colors[deck.color].extraLight,
              margin: 4,
              padding: 4,
            }}
            autoFocus={false}
            onChangeText={(answer) => this.changeAnswer(answer)}
            value={answer}
          ></TextInput>
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
              this.submit()
            }}
          >
            <Text style={{ fontSize: 24, color: colors[deck.color].extraLight }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (deck) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDeckCard: (key, card) => dispatch(addDeckCard(key, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardForm)