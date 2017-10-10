import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
    return (
      <View
        style={{ flex: 1 }}
      >
        <Card
          deck={deck}
          style={{
            backgroundColor: colors[deck.color].medium,
          }}
        ></Card>
      </View>
    )
  }
}

export default Deck