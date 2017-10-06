import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Decks from './components/Decks'
import Deck from './components/Deck'

const MainNavigator = StackNavigator({
  Main: { screen: Decks },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      headerTitle: `${navigation.state.params.headerTitle}`,
    }),
  }
});

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    )
  }
}
