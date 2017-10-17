import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native'
import { MaterialCommunityIcons, Ionicons, Octicons, Entypo } from '@expo/vector-icons'
import Tile from './Tile'
import { userDecks } from '../helpers/DummyData'
import colors from '../helpers/colors'

class Decks extends Component {
  state = {
    addDeckFormVisible: false,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Decks',
      headerRight:
      <TouchableWithoutFeedback
        onPress={() => navigation.state.params.setAddDeckFormVisible(true)}
      >
        <Entypo name='plus' size={28} style={{ backgroundColor: 'transparent', margin: 8 }} />
      </TouchableWithoutFeedback>
    }
  }
  componentWillMount = () => {

    // Set params in navigation prop so that it can be passed in
    // navigationOptions above.
    this.props.navigation.setParams({
      setAddDeckFormVisible: (visible) => this.setAddDeckFormVisible(visible),
    })
  }
  goToDeckView = (deck) => {
    // Add a cover card for the deck
    deck = {...deck, cards: [{ cardCover: true }].concat(deck.cards)}
    this.props.navigation.navigate('Deck', { deck: deck })
  }
  setAddDeckFormVisible = (visible) => {
    this.setState({
      addDeckFormVisible: visible
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.addDeckFormVisible}
          animationType={"slide"}
          transparent={true}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors["BlueGrey"].dark }}
          >
            <View
              style={{
                position: 'absolute',
                top: 22,
                right: 8,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setAddDeckFormVisible(false)
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
                color: colors["BlueGrey"].extraLight,
                margin: 4,
                textAlign: 'center',
              }}>New Deck Title
                </Text>
              <TextInput
                style={{
                  fontSize: 24,
                  color: colors["BlueGrey"].extraLight,
                  borderWidth: 1, borderRadius: 5,
                  borderColor: colors["BlueGrey"].extraLight,
                  margin: 4,
                  padding: 4,
                }}
                autoFocus={true}
              ></TextInput>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors["BlueGrey"].extraLight,
                  margin: 4,
                  padding: 4,
                  alignItems: 'center'
                }}
                onPress={() => {
                  /**TODO:
                   * Create deck (add to local storage)
                   */
                  this.setAddDeckFormVisible(false)
                }}
              >
                <Text style={{ fontSize: 24, color: colors["BlueGrey"].extraLight }}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView
          contentContainerStyle={styles.deckScrollView}
        >
          {
            userDecks && Object.values(userDecks).map(deck => (
              <View
                key={deck.name}
                style={{ flexDirection: 'row' }}
              >
                <Tile
                  title={deck.name}
                  subtitle={deck.cards.length}
                  onPress={() => this.goToDeckView(deck)}
                  style={[styles.deck, { backgroundColor: colors[deck.color].medium }]}
                >
                </Tile>
              </View>

            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  deckScrollView: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
  },
  deck: {
    height: 128,
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
  }
})

export default Decks