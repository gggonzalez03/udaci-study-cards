import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { MaterialCommunityIcons, Ionicons, Octicons, Entypo } from '@expo/vector-icons'
import Tile from './Tile'
import { userDecks } from '../helpers/DummyData'
import colors from '../helpers/colors'

class Decks extends Component {
  state = {

  }
  static navigationOptions = {
    headerTitle: 'Decks',
    headerRight: <Entypo name='plus' size={28} style={{ backgroundColor: 'transparent', margin: 8 }} />,
  }
  goToDeckView = (deck) => {
    this.props.navigation.navigate('Deck', { headerTitle: deck.name })
  }
  render() {
    return (
      <View style={styles.container}>
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