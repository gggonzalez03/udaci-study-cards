import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import colors from '../helpers/colors'
import { Entypo, Ionicons } from '@expo/vector-icons'

class EndQuizMessage extends Component {

  endQuiz = () => {
    this.props.onExit()
  }

  startOver = () => {
    this.props.onStartOver()
  }

  render() {
    const { deck } = this.props
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
          <Text style={{ color: 'white', fontSize: 28, marginBottom: 8 }}>You scored 2/{deck.cards.length-1}</Text>
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

export default EndQuizMessage