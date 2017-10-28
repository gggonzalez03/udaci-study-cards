import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Decks from './components/Decks'
import Deck from './components/Deck'
import BarChartScreen from './components/BarChartScreen'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

const MainNavigator = StackNavigator({
  Main: { screen: Decks },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `${navigation.state.params.deck.name}`,
    }),
  },
  BarChartScreen: { screen: BarChartScreen }
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}
