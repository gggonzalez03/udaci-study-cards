import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../helpers/colors'

class Card extends Component {
  state = {

  }
  render() {
    const { style, deck } = this.props
    return (
      <View
        style={[styles.container, style]}
      >
        <Text
          style={styles.cardCount}
        >0/20</Text>
        <View
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Text
            style={styles.question}
          >This is the question</Text>
          <TouchableOpacity
            style={styles.flipButton}>
            <Text
              style={[styles.flipButtonLabel, { color: colors[deck.color].dark }]}
            >Show Answer</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
          >
            <Text
              style={styles.buttonLabel}
            >Incorrect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
          >
            <Text
              style={styles.buttonLabel}
            >Correct</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  cardCount: {
    color: 'white',
    fontSize: 24,
  },
  question: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  flipButton: {
    alignItems: 'center',
  },
  flipButtonLabel: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  }
})

export default Card