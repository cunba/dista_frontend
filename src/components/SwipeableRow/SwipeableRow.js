import Icon from 'react-native-vector-icons/MaterialIcons'
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class SwipeableRow extends Component {

    renderLeftActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={this.close}>
          <Animated.Text
            style={[
              styles.actionText
            ]}
            >
          </Animated.Text>
        </RectButton>
      );
    };

    renderRightAction = (text, color, x, progress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });
      const pressHandler = () => {
        this.close();
        if(this.props.onPress)
          this.props.onPress()
      };
      return (
        <Animated.View style={{ height: 136, flex: 1, transform: [{ translateX: 0 }] }}>
          <RectButton
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={pressHandler}>
            <Text style={styles.actionText}>{text}</Text>
          </RectButton>
        </Animated.View>
      );
    };

    renderRightActions = progress => (
      <View style={{ width: 90, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
        {this.renderRightAction(<Icon name="call" size={45} />, '#05bd52', 90, progress)}
      </View>
    );
    updateRef = ref => {
      this._swipeableRow = ref;
    };
    close = () => {
      this._swipeableRow.close();
    };
    render() {
        const { children } = this.props;
        return (
        <Swipeable
          ref={this.updateRef}
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          renderLeftActions={this.renderLeftActions}
          renderRightActions={this.renderRightActions}>
          {children}
        </Swipeable>
      );
    }
  }
  
  const styles = StyleSheet.create({
    leftAction: {
      flex: 1,
      backgroundColor: '#497AFC',
      justifyContent: 'center',
    },
    actionText: {
      color: 'white',
      fontSize: 16,
      backgroundColor: 'transparent',
      padding: 0,
    },
    rightAction: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });