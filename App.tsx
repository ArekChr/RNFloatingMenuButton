import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default class App extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };

  toggleOpen = () => {
    const toValue = this._open ? 0 : 1;
    Animated.timing(this.state.animation, {
      toValue,
      duration: 300,
      useNativeDriver: true
    }).start();

    this._open = !this._open;
  };

  render() {
    const bgStyle = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30]
          })
        }
      ]
    };

    const reloadStyle = {
      transform: [
        {
          scale: this.state.animation
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -70]
          })
        }
      ]
    };

    const orderStyle = {
      transform: [
        {
          scale: this.state.animation
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    };

    const labelPositionInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-30, -90]
    });

    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1]
    });

    const labelStyle = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateX: labelPositionInterpolate
        }
      ]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]}></Animated.View>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, orderStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Order
            </Animated.Text>
            <Icon name="food-fork-drink" size={20} color="#555"></Icon>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, reloadStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Reload
            </Animated.Text>
            <Icon name="reload" size={20} color="#555"></Icon>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.button, styles.pay]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Pay
            </Animated.Text>
            <Text style={styles.payText}>$5.00</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0,0,0,.2)",
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20
  },
  label: {
    color: "#FFF",
    position: "absolute",
    fontSize: 18,
    backgroundColor: "transparent"
  },
  pay: {
    backgroundColor: "#00B15E"
  },
  payText: {
    color: "#FFF"
  },
  other: {
    backgroundColor: "#FFF"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
