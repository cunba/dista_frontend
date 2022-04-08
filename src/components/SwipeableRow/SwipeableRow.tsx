import React, { LegacyRef, ReactNode, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export interface SwipeableProps {
    onPress?: () => void
    children?: ReactNode
    swipeLeftItem : {
        content: ReactNode
        color: string
        x: number
    }
    //ref: any
}

export const SwipeableRowItem = (props: SwipeableProps) => {

    const [swipableRowRef, setSwipableRowRef] = useState<Swipeable>()

    const renderLeftActions = (progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1]
      });
      return (
        <RectButton style={styles.leftAction} onPress={close}>
          <Animated.Text
            style={[
              styles.actionText
            ]}
            >
          </Animated.Text>
        </RectButton>
      );
    };

    const renderRightAction = (content: ReactNode, color: string, x: number, progress: Animated.AnimatedInterpolation) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });

      const pressHandler = () => {
        close();
        if(props.onPress) props.onPress()
      };
      
      return (
        <Animated.View style={{ height: 136, flex: 1, transform: [{ translateX: 0 }] }}>
          <RectButton
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={pressHandler}>
            <Text style={styles.actionText}>{content}</Text>
          </RectButton>
        </Animated.View>
      );
    };

    const renderRightActions = (progress: Animated.AnimatedInterpolation) => (
      <View style={{ width: 90, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
        {renderRightAction(props.swipeLeftItem.content, props.swipeLeftItem.color, props.swipeLeftItem.x, progress)}
      </View>
    );

    const close = () => {
        if(swipableRowRef) swipableRowRef.close()
    };

    const swipableRef = (ref: Swipeable) => {
        setSwipableRowRef(ref)
        return useRef<Swipeable>(swipableRowRef!!)
    }

    const { children } = props;
        return (
        <Swipeable
          //ref={swipableRef}
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}>
          {children}
        </Swipeable>
      );
    
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