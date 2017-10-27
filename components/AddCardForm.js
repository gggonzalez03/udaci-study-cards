import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import colors from '../helpers/colors'
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

    // Only continue submit if both question and answer are
    // not null
    if (this.state.question && this.state.answer) {
      this.props.addDeckCard(this.props.deck.id, {
        question: this.state.question,
        answer: this.state.answer,
      })
      this.props.afterSubmit()
    }

    /**
     * Give warning to the user saying the that the fields must be filled
     */
  }

  render() {

    const { deck } = this.props
    const { question, answer } = this.state

    return (
      <View
        style={[styles.container, { backgroundColor: colors[deck.color].dark }]}
      >
        <View
          style={styles.closeBtnContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.cancel()
            }}
          >
            <Entypo name='circle-with-cross' size={28} style={styles.closeBtn} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{}}
        >
          <Text style={[styles.inputLabel, { color: colors[deck.color].extraLight }]}>New Card Question
        </Text>
          <TextInput
            style={[styles.input, {
              color: colors[deck.color].extraLight,
              borderColor: colors[deck.color].extraLight,
            }]}
            autoFocus={false}
            onChangeText={(question) => this.changeQuestion(question)}
            value={question}
            onSubmitEditing={() => {
              this.submit()
            }}
          ></TextInput>
          <Text style={[styles.inputLabel, { color: colors[deck.color].extraLight }]}>New Card Answer
        </Text>
          <TextInput
            style={[styles.input, {
              color: colors[deck.color].extraLight,
              borderColor: colors[deck.color].extraLight,
            }]}
            autoFocus={false}
            onChangeText={(answer) => this.changeAnswer(answer)}
            value={answer}
            onSubmitEditing={() => {
              this.submit()
            }}
          ></TextInput>
          <TouchableOpacity
            style={[styles.submit, { borderColor: colors[deck.color].extraLight }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 22,
    right: 8,
  },
  closeBtn: {
    color: 'white',
    backgroundColor: 'transparent',
    margin: 8
  },
  inputLabel: {
    fontSize: 48,
    margin: 4,
    textAlign: 'center',
  },
  input: {
    fontSize: 24,
    borderWidth: 1, borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 4,
    padding: 4,
    alignItems: 'center'
  }
})

const mapStateToProps = ({ deck }) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDeckCard: (key, card) => dispatch(addDeckCard(key, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardForm)