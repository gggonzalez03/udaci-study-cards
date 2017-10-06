import React, { Component } from 'react'
import { View, Platform, Animated } from 'react-native'

class AnimatedElevatedView extends Component {
  state = {
    elevation: this.props.elevation ? new Animated.Value(this.props.elevation) : new Animated.Value(0)
  }
  componentDidMount = () => {
    Animated.timing(this.state.elevation, {
      toValue: this.props.onPressOutElevation,
      duration: 125
    }).start()
  }
  pushDown = () => {
    Animated.timing(this.state.elevation, {
      toValue: this.props.onPressInElevation,
      duration: 125
    }).start()
  }
  liftUp = () => {
    Animated.timing(this.state.elevation, {
      toValue: this.props.onPressOutElevation,
      duration: 125
    }).start()
  }
  render() {
    let { onPressInElevation, onPressOutElevation, onPress, style } = this.props
    let { elevation } = this.state

    if (Platform.OS === 'android') {
      return (
        <View
          style={style}
          elevation={this.props.elevation}
          onStartShouldSetResponder={() => true}
          onResponderRelease={evt => {
            onPress()
          }}
        >
          {this.props.children}
        </View>
      )
    }

    let shadowOpacity = Animated.add(Animated.multiply(new Animated.Value(0.0015), elevation), new Animated.Value(0.18))
    let shadowRadius = Animated.multiply(new Animated.Value(0.54), elevation)
    let shadowOffsetHeight = Animated.multiply(new Animated.Value(0.6), elevation)

    let iosShadowElevation = {
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
      shadowOffset: {
        width: 0,
        height: shadowOffsetHeight,
      },
    };

    if (!onPressOutElevation)
      onPressOutElevation = 5

    return (
      <Animated.View
        style={[iosShadowElevation, style]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={evt => {
          this.pushDown()
        }}
        onResponderRelease={evt => {
          this.liftUp()
          onPress()
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default AnimatedElevatedView