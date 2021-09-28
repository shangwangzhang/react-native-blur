import {
  View,
  Platform,
  NativeModules,
  requireNativeComponent,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const emitter = require('tiny-emitter/instance')

const iface = {
  name: 'BlurView',
  propTypes: {
    ...View.propTypes,
    brightness: PropTypes.any,
    radius: PropTypes.number,
    downsampling: PropTypes.number,
    blurStyle: PropTypes.string,
    vibrant: PropTypes.bool,
    idBlur: PropTypes.string,
  },
}

const RCTBlurOverlay = Platform.select({
  ios: () => requireNativeComponent('BlurOverlay', iface),
  android: () => requireNativeComponent('RCTBlurOverlay', iface),
})()

export default class BlurOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBlurOverlay: false,
      fadeIn: new Animated.Value(0),
    }
    this._openOverlay = this.openOverlay.bind(this)
    this._closeOverlay = this.closeOverlay.bind(this)
  }

  openOverlay() {
    this.setState(
      {
        showBlurOverlay: true,
        fadeIn: new Animated.Value(0),
      },
      () => {
        Animated.timing(this.state.fadeIn, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }
    )
  }

  closeOverlay() {
    Animated.timing(this.state.fadeIn, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => this.setState({ showBlurOverlay: false }))
  }

  componentDidMount() {
    emitter.on('drawer-open' + this.props.idBlur, this._openOverlay)
    emitter.on('drawer-close' + this.props.idBlur, this._closeOverlay)
  }

  componentWillUnmount() {
    emitter.off('drawer-open' + this.props.idBlur, this._openOverlay)
    emitter.off('drawer-close' + this.props.idBlur, this._closeOverlay)
  }

  render() {
    const { children } = this.props

    if (!this.state.showBlurOverlay) {
      return null;
    }

    return (
      <Animated.View style={[{ opacity: this.state.fadeIn }, styles.container]}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={this.props.onPress}
        >
          <RCTBlurOverlay
            {...this.props}
            style={[this.props.customStyles, styles.container]}
          >
            <View style={[this.props.customStyles, styles.container]}>
              {children}
            </View>
          </RCTBlurOverlay>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: null,
    zIndex: 999,
  },
})

export function openOverlay(idBlur) {
  emitter.emit('drawer-open' + idBlur)
}

export function closeOverlay(idBlur) {
  emitter.emit('drawer-close' + idBlur)
}
