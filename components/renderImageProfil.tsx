import React from 'react'
import { View, StyleSheet, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-paper'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')
const SizeImage = 200

export function RenderImageProfile({urlImage, onPress}) {

  return(
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            width: SizeImage,
            height: SizeImage,
            marginVertical: 40,
            borderRadius: SizeImage,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        <Animated.Image
          source={{uri: urlImage}}
          style={{width: "100%", height: "100%", borderRadius: SizeImage}}
        />
       
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
