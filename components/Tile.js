import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Animated } from 'react-native'
import { fonts } from '../helpers/MaterialValues'
import AnimatedElevatedView from './AnimatedElevatedView'

class Tile extends Component {
  render() {
    let { title, subtitle, icon, style, onPress } = this.props
    return (
      <AnimatedElevatedView
        elevation={3}
        style={[styles.container, style]}
        onPress={onPress}
        onPressInElevation={1}
        onPressOutElevation={3}
      >
        {icon && icon}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle} card/s</Text>
      </AnimatedElevatedView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowRadius: 3,
    padding: 24,
    backgroundColor: 'white',
  },
  title: {
    ...fonts.sizes[Platform.OS].headline,
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    ...fonts.sizes[Platform.OS].subtitle,
    ...fonts.families[Platform.OS].bold,
    textAlign: 'center',
    color: 'white',
  }
})

export default Tile