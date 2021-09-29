import {
  View,
  Platform,
  requireNativeComponent,
  StyleSheet,
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

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
  ios: () => requireNativeComponent('BlurOverlay'),
  android: () => requireNativeComponent('RCTBlurOverlay'),
})()

export default class BlurOverlayComponent extends React.Component {

  render() {
    const { children, style } = this.props

    return (
      <RCTBlurOverlay
        {...this.props}
        style={[styles.container, style]}
      >
        {children}
      </RCTBlurOverlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
})
