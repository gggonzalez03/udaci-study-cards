import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import colors from '../helpers/colors'

class Card extends Component {
  state = {
    frontFaceFlip: new Animated.Value(0),
    backFaceFlip: new Animated.Value(180),
    padding: new Animated.Value(8),
    front: true,
  }
  flipCard = () => {
    // Control the flipValue here so that the flip can be toggled
    // back and front
    let frontFaceFlip = 180
    let backFaceFlip = 360
    if (!this.state.front) {
      frontFaceFlip = 0
      backFaceFlip = 180
    }
    Animated.sequence([
      Animated.timing(this.state.padding, {
        toValue: 0,
        duration: 100,
      }),
      Animated.parallel([
        Animated.timing(this.state.frontFaceFlip, {
          toValue: frontFaceFlip,
          duration: 300,
        }),
        Animated.timing(this.state.backFaceFlip, {
          toValue: backFaceFlip,
          duration: 300,
        }),
      ]),
      Animated.timing(this.state.padding, {
        toValue: 8,
        duration: 100,
      }),
    ]).start(() => this.setState({
      front: !this.state.front
    }))
  }
  correctPressed = () => {
    this.props.correctPressed()
  }
  incorrectPressed = () => {
    this.props.incorrectPressed()
  }
  startQuiz = () => {
    this.props.startQuiz()
  }
  render() {
    const { style, deck, card } = this.props
    if (card.item.cardCover)
      return (
        <Animated.View
          style={[style, styles.container, { padding: this.state.padding }]}
        >
          <View
            style={{ flex: 1 }}
          >
            <Animated.View
              style={[styles.card, {
                backfaceVisibility: 'hidden',
                backgroundColor: colors[deck.color].medium,
                transform: [
                  { rotateY: this.state.frontFaceFlip.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }
                ],
              }]}
            >
              <View
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Text
                  style={styles.question}
                >{deck.name}</Text>
                  <Text
                    style={[styles.flipButtonLabel, { color: colors[deck.color].dark }]}
                  >{deck.cards.length-1} card/s</Text>
              </View>
              <View
                style={styles.buttonContainer}
              >
                <TouchableOpacity
                  onPress={() => this.startQuiz()}
                  style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
                >
                  <Text
                    style={styles.buttonLabel}
                  >Start Quiz</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      )

    return (
      <Animated.View
        style={[style, styles.container, { padding: this.state.padding }]}
      >
        <View
          style={{ flex: 1 }}
        >
          <Animated.View
            style={[styles.card, {
              backfaceVisibility: 'hidden',
              backgroundColor: colors[deck.color].medium,
              transform: [
                { rotateY: this.state.backFaceFlip.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }
              ],
              zIndex: this.state.front?1:3,
            }]}
          >
            <Text
              style={styles.cardCount}
            >{card.index}/{deck.cards.length-1}</Text>
            <View
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Text
                style={styles.question}
              >{card.item.answer}</Text>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => this.flipCard()}
              >
                <Text
                  style={[styles.flipButtonLabel, { color: colors[deck.color].dark }]}
                >Show Question</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => this.incorrectPressed()}
                style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
              >
                <Text
                  style={styles.buttonLabel}
                >Incorrect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.correctPressed()}
                style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
              >
                <Text
                  style={styles.buttonLabel}
                >Correct</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.card, {
              backfaceVisibility: 'hidden',
              backgroundColor: colors[deck.color].medium,
              transform: [
                { rotateY: this.state.frontFaceFlip.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }
              ],
              zIndex: 2,
            }]}
          >
            <Text
              style={styles.cardCount}
            >{card.index}/{deck.cards.length-1}</Text>
            <View
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Text
                style={styles.question}
              >{card.item.question}</Text>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => this.flipCard()}
              >
                <Text
                  style={[styles.flipButtonLabel, { color: colors[deck.color].dark }]}
                >Show Answer</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => this.incorrectPressed()}
                style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
              >
                <Text
                  style={styles.buttonLabel}
                >Incorrect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.correctPressed()}
                style={[styles.button, { backgroundColor: colors[deck.color].dark }]}
              >
                <Text
                  style={styles.buttonLabel}
                >Correct</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 8,
    margin: 16,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    padding: 16,
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