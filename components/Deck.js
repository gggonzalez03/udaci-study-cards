import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import Card from './Card'
import colors from '../helpers/colors'

class Deck extends Component {
  state = {

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.headerTitle,
    }
  }
  componentWillMount = () => {
    // Set params in navigation prop so that it can be passed in
    // navigationOptions above.
    this.props.navigation.setParams({
      headerTitle: this.props.navigation.state.params.deck.name
    })
  }
  render() {
    const deck = this.props.navigation.state.params.deck
    const {height, width} = Dimensions.get('window')
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
                width: width-32
              }}
            ></Card>
          )}
        />
      </View>
    )
  }
}

export default Deck