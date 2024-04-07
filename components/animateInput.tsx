import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'

export function TranslateX ({children, animate=false, onChangeValueAnimate}){
  const offset = useSharedValue(0)
  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }))

  const OFFSET = 40
  const TIME = 60
  const DELAY = 100

  const handleRequiredInput = () =>{
    offset.value = withDelay(
      DELAY,
      withSequence(
        withTiming(-OFFSET, { duration: TIME * 2}),
        withTiming(OFFSET, { duration: TIME }),
        withTiming(0, { duration: TIME * 2})
      )
    )
  }

  useEffect(() => {
    handleRequiredInput()
    onChangeValueAnimate(false)
  }, [animate])

  return (
    <Animated.View style={[style]}
    >
      {children}
    </Animated.View>
  )
}
export function AnimateFadeIn({children, time, style}){
  const OPACITY = useSharedValue(0)

  useEffect(() => {
    OPACITY.value = withTiming(1, {
      duration: time,
      easing: Easing.linear
    })
    
  },[])

  const opacityBox = useAnimatedStyle(() => {
    return {
      opacity: OPACITY.value
    }
  })
  return (
    <Animated.View style={[opacityBox, styles.opacityBox, style]} >
      {children}
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  opacityBox: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

