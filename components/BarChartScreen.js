import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import BarChart from './BarChart'
import colors from '../helpers/colors'

class BarChartScreen extends Component {
    state = {

    }
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Chart',
        }
      }
    render() {
        // Format decks here
        const decks = Object.values(this.props.decks).map(deck => ({
            key: deck.id,
            value: deck.timesQuizzed,
            colorSet: colors[deck.color],
        }))
        return (
            <View style={{ flex: 1 }}>
                <BarChart
                    data={decks}
                    step={1}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ deck }) => {
    return {
        decks: deck.decks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartScreen)