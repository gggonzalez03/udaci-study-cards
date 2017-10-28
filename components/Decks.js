import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native'
import { MaterialCommunityIcons, Ionicons, Octicons, Entypo, Foundation } from '@expo/vector-icons'
import Tile from './Tile'
import AddDeckForm from './AddDeckForm'
import colors from '../helpers/colors'
import { getDecks } from '../actions'
import { connect } from 'react-redux'

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
      </TouchableWithoutFeedback>,
      headerLeft:
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('BarChartScreen')}
      >
        <Foundation name='graph-bar' size={28} style={{ backgroundColor: 'transparent', margin: 8 }} />
      </TouchableWithoutFeedback>,
    }
  }
  componentWillMount = () => {

    // Set params in navigation prop so that it can be passed in
    // navigationOptions above.
    this.props.navigation.setParams({
      setAddDeckFormVisible: (visible) => this.setAddDeckFormVisible(visible),
    })

    this.props.getDecks()
  }
  goToDeckView = (deck) => {
    // Add a cover card for the deck
    deck = { ...deck, cards: [{ cardCover: true }].concat(deck.cards) }
    this.props.navigation.navigate('Deck', { deck: deck })
  }
  setAddDeckFormVisible = (visible) => {
    this.setState({
      addDeckFormVisible: visible
    })
  }
  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.addDeckFormVisible}
          animationType={"slide"}
          transparent={true}
        >
          <AddDeckForm
            afterSubmit={() => {
              this.setAddDeckFormVisible(false)
              this.props.getDecks()
            }}
            afterCancel={() => this.setAddDeckFormVisible(false)}
          />
        </Modal>
        <ScrollView
          contentContainerStyle={styles.deckScrollView}
        >
          {
            decks && decks.map(deck => (
              <View
                key={deck.id}
                style={{ flexDirection: 'row' }}
              >
                <Tile
                  title={deck.name}
                  subtitle={deck.cards.length - 1}
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

const mapStateToProps = ({ deck }) => {
  return {
    decks: Object.values(deck.decks ? deck.decks : []),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDecks: () => dispatch(getDecks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)