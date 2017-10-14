import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import Card from './Card'
import colors from '../helpers/colors'

class Deck extends Component {
  state = {
    addCardFormVisible: false
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
  render() {
    const deck = this.props.navigation.state.params.deck
    const { height, width } = Dimensions.get('window')
    return (
      <View
        style={{ flex: 1 }}
      >
        <FlatList
          horizontal={true}
          pagingEnabled={true}
          data={deck.cards}
          keyExtractor={(card, index) => index}
          renderItem={(card) => (
            <Card
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
                  this.setAddCardFormVisible(false)
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
                  /**TODO:
                   * Add deck card (add to local storage)
                   */
                  this.setAddCardFormVisible(false)
                }}
              >
                <Text style={{ fontSize: 24, color: colors[deck.color].extraLight }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Deck