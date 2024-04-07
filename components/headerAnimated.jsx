import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import { useTheme, Text } from 'react-native-paper' 
import { Ionicons, Entypo } from '@expo/vector-icons'
import { useUserData } from '../utils/useUserData'

const { width, height } = Dimensions.get('window');
const maxHeightContainerProfil = 300
const maxSizeImage = 150
const maxTranslateX = (width - 30) / 4

export function HeaderAnimated() {
  const theme = useTheme()
  const [containerFlexDirection, setContainerFlexDirection] = useState("row")
  const heightContainerProfil = useSharedValue(100)
  const imageSize = useSharedValue(80)
  const fontSizeName = useSharedValue(20)
  const fontSizeOtherIndication = useSharedValue(12)
  const translateXImage = useSharedValue(0)
  const boxNamePositionY = useSharedValue(0)
  const [nameIconOpenClose, setNameIconOpenClose] = useState("chevron-right")
  const { firstname, lastname, photoURL, username } = useUserData()

  const handlePress = () => {
    if (imageSize.value > 80){
      heightContainerProfil.value = withTiming(100)
      imageSize.value = 80
      translateXImage.value = 0
      boxNamePositionY.value = 0
      fontSizeName.value = withDelay(100, withTiming(20))
      fontSizeOtherIndication.value = withDelay(100, withTiming(12))
      setNameIconOpenClose("chevron-right")
      setContainerFlexDirection("row")
      return
    }
    heightContainerProfil.value = withTiming(maxHeightContainerProfil)
    imageSize.value = maxSizeImage
    boxNamePositionY.value = maxSizeImage
    translateXImage.value = maxTranslateX
    fontSizeName.value = withDelay(100, withTiming(30))
    fontSizeOtherIndication.value = withDelay(100, withTiming(16))
    setNameIconOpenClose("chevron-up")
    setContainerFlexDirection("column")
  }

  const animatedStyleImage = useAnimatedStyle(() => ({
    width: withTiming(imageSize.value),
    height: withTiming(imageSize.value),
    borderRadius: withTiming(imageSize.value),
    transform: [{translateX: withTiming(translateXImage.value)}],
  }))

  return(
    <View style={{width: "100%"}} >
      <Text style={[styles.title, {color: theme.colors.secondary}]} >Paramètres</Text>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.secondaryContainer,
            height: heightContainerProfil,
            flexDirection: containerFlexDirection
          }
        ]}
      >
        <View style={{flexDirection: containerFlexDirection}} >
          <Animated.Image
            source={photoURL}
            style={[
              animatedStyleImage,
              {
                // position: "absolute",
                // top: 0,
                // left: 5
              }
            ]}
          />
          <Animated.View style={[
            styles.containerName,
            {
              alignItems: 'center'
            }
          ]}  >
            <Animated.Text 
              style={[
                styles.name,
                {
                  color: theme.colors.secondary,
                  fontSize: fontSizeName,
                }
              ]}
            >
              {
                `${firstname} ${lastname}` > 15?
                `${firstname} ${lastname}`.slice(0, 13) + "...":
                `${firstname} ${lastname}`
              }
            </Animated.Text>
            <Animated.Text 
              style={[
                styles.textInformation,
                {
                  color: theme.colors.outline,
                  fontSize: fontSizeOtherIndication

                }
              ]}
            >
              {"@" + username}
            </Animated.Text>
          </Animated.View>
        </View>
        {/*<Entypo
          name={nameIconOpenClose} 
          size={30} 
          onPress={handlePress}
          color={theme.colors.primary} 
          style={{
            alignSelf: 'center', 
          }} 
        />*/}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    margin: 10,
    fontFamily: "Poppins-SemiBold"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  containerProfil: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  containerName: {
    marginHorizontal: 5,
    justifyContent: "center",
  },
  name:{
    fontSize: 20,
    textAlignVertical: 'center',
    fontFamily: "Roboto-Medium",
    fontWeight: 'bold'
  },
  textInformation: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    textAlign: "left",
    width: "100%"
  }
});