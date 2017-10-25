import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import colors from '../helpers/colors'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { updateMaxScore, updateScore } from '../actions'
import { connect } from 'react-redux'

class EndQuizMessage extends Component {

  componentWillMount = () => {
    this.props.updateMaxScore(this.props.deck.cards.length - 1)
  }

  endQuiz = () => {
    this.props.onExit()
    this.props.updateScore(0)
  }

  startOver = () => {
    this.props.onStartOver()
    this.props.updateScore(0)
  }

  render() {
    const { deck, quiz } = this.props
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
              this.endQuiz()
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
          <Text style={{ color: 'white', fontSize: 28, marginBottom: 8 }}>{quiz.score}/{quiz.maxScore}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingLeft: 32,
            paddingRight: 32,
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors[deck.color].extraLight,
                margin: 4,
                padding: 4,
                alignItems: 'center'
              }}
              onPress={() => {
                this.endQuiz()
              }}
            >
              <Text style={{ fontSize: 24, color: colors[deck.color].extraLight }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors[deck.color].extraLight,
                margin: 4,
                padding: 4,
                alignItems: 'center'
              }}
              onPress={() => {
                this.startOver()
              }}
            >
              <Text style={{ fontSize: 24, color: colors[deck.color].extraLight }}>Start Over</Text>
            </TouchableOpacity>
          </View>
        </View>
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
      maxScore: quiz.maxScore,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMaxScore: (score) => dispatch(updateMaxScore(score)),
    updateScore: (score) => dispatch(updateScore(score))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndQuizMessage)