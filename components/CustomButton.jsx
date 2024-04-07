import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'react-native-paper'

const CustomButton = ({flatListRef, flatListIndex, dataLength}) => {
  const navigation = useNavigation();
  const theme = useTheme()

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({index: flatListIndex.value + 1});
        } else {
          navigation.navigate('starter');
        }
      }}>
      <Animated.View 
      	style={[
      		buttonAnimationStyle, 
      		{ 
      			backgroundColor: theme.colors.primary,
      			justifyContent: 'center',
      			alignItems: "center",
      			borderRadius: 20,
      		}
      	]}
      >
        <Animated.Text style={[styles.textButton, textAnimationStyle, { color: theme.colors.primaryContainer}]}>
          Commencer
        </Animated.Text>
        <Animated.Image
          source={require('../images/ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
  },
  textButton: {
  	fontSize: 16, 
  	position: 'absolute',
  	fontFamily: "Bold"
  },
});
