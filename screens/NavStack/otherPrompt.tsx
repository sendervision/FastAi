import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, ImageBackground, Dimensions, Animated, Image, Pressable } from 'react-native'
import { Appbar, useTheme, ActivityIndicator } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
import { data } from '../../datasAi/image'
import { CopyText } from '../../utils/copyText'
import { datasPrompts } from "../../datasAi/prompt.js"

const { width,height } = Dimensions.get('window')

export function OtherPrompt({navigation}) {
  const theme = useTheme()
  const [viewHeight, setViewHeight] = useState(height - 30)
  const [isViewMessage, setIsViewMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [animation, setAnimation] = useState({
    visible: false,
    type: ""
  })
  const prop = animation.visible? {animation: animation.type} : {}
  const animate = () => {
    setIsViewMessage(true)
    setAnimation({visible: true, type: "fadeInDown"})
    setTimeout(function() {
      setAnimation({visible: true, type: "fadeOutUp"})
      // setIsViewMessage(false)
    }, 6000);
  }

  function toggleAnime() {
    
  }

  return(
    <View  >
      <StatusBar hidden/>
      <Animated.FlatList 
        data={[...data, ...datasPrompts]}
        pagingEnabled
        // style={{height: height, paddingTop: 30}}
        keyExtractor={item => item.first_name}
        // decelerationRate="fast"
        // horizontal
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return(
            <View style={{width, height}} >
            {/*<Image
              source={item.image}
              style={{width, height}}
            />*/}
            {<ImageBackground 
              key={index}
              source={item.image}
              style={{width, height}}
              onLoadStart={() => {setIsLoading(true)}}
              onLoadEnd={() => setIsLoading(false)}
              // onLoad={({nativeEvent}) => {
              //   setIsLoading(false)
              // }}
            >

              {
                isViewMessage?
                <Animatable.View 
                  style={[styles.message, {backgroundColor: theme.colors.secondary, opacity: 1}]}
                  {...prop}
                >
                  <Text style={{color: theme.colors.secondaryContainer, ...styles.title}} >Prompt</Text>
                  <Text style={{color: theme.colors.surface, ...styles.description}} >
                    Vous avez copier un prompt coller le dans un modèle de génération d'image
                    et laisser le bot vous générez une image
                  </Text>
                </Animatable.View> : null
              }{
                <ActivityIndicator color={theme.colors.onSurface} size="large" animating={isLoading} />
              }
              <Pressable
                onPress={() => {
                  CopyText(item.desc.replace("“", ""), "Prompt copier")
                  animate()
                }}
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: theme.colors.secondary,
                    position: "absolute",
                    bottom: 30,
                    right: 10,
                    left: 10,
                    fontSize: 20,
                    backgroundColor: 'transparent'
                  }}
                >
                  {item.desc}
                </Text>
              </Pressable>

              
            </ImageBackground>}
            </View>
          )
        }}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    position: "absolute",
    top: 30,
    width: width - 30,
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: 'bold',
  }
})
