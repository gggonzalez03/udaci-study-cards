import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { metrics } from '../helpers/MaterialValues'
import ElevatedView from 'react-native-elevated-view'

class BarChart extends Component {
  render() {
    const { data, step } = this.props
    const maxValue = data.reduce((sum, value) => sum + value.value, 0)
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.barChart}>
            {data && data.map(datum => (
              <TouchableOpacity
                key={datum.key}
                onPress={() => console.log("Do something Reduxy")}
              >
                <ElevatedView
                  elevation={2}
                  style={[styles.bar, {
                    height: `${(datum.value / maxValue) * 98}%`,
                    backgroundColor: datum.colorSet.medium,
                  }]}>
                  <View style={{backgroundColor: 'transparent'}}>
                    {datum.icon && datum.icon(30, datum.colorSet.dark)}
                  </View>
                </ElevatedView>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: metrics.baselineGrid,
    paddingBottom: metrics.baselineGrid,

  },
  barChart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 40,
    margin: 5,
    borderRadius: 5,
  }
})

export default BarChart;   