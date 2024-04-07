import { useState } from 'react'
import ParsedText from 'react-native-parsed-text'
import {
  View,
  StyleSheet,
  ToastAndroid, 
  Platform,
  Dimensions
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Clipboard from 'expo-clipboard'
import { MaterialIcons } from '@expo/vector-icons'
import { createNotifications } from 'react-native-notificated'

const { width } = Dimensions.get('window')

export function TextMessage({children, ...props}) {
  const theme = useTheme()
  const [resultWeb, setResultWeb] = useState(null)
  const { useNotifications } = createNotifications()
  const { notify } = useNotifications()


  const renderTextDoubleStars = (text) => {
    const regex = /\*\*([a-zA-Z0-9\s]+)\*\*/
    const matches = text.match(regex)
    return matches?.slice(-1)[0]
  }

  const renderTextTripleBactick = (text) => {
    const regex = /```([^`]*)```/
    const word = text.match(regex)?.slice(-1)[0]
    const firstWord = word.match(/^\w+/)[0]
    const restWord = word.substring(firstWord.length).trim()
    // console.log(firstWord)

    return (
      <View
        style={{
          width: width - 70,
          backgroundColor: theme.colors.surface,
          padding: 5,
          borderRadius: 10,

        }}
      >
        <Text style={{
          color: theme.colors.primary,
          marginBottom: 5,
          fontSize: 14,
          fontFamily: 'Poppins-Bold'
        }} >
          {firstWord.toUpperCase()}
        </Text>
        <Text
          style={{
            color: theme.colors.onSurface,
            fontWeight: 'bold',
          }}
        >
          {restWord}
        </Text>
        <MaterialIcons 
          name="content-copy" 
          size={25} 
          onPress={() => toggleCode(restWord)}
          color={theme.colors.primary}
          style={{marginVertical: 5, alignSelf: 'flex-end'}}
        />
      </View>
    )
  }

  const showNotificationToCopy = (message) => {
    if (Platform.OS === "android"){
      ToastAndroid.show(message, ToastAndroid.SHORT)
    }else{
      notify("success", {
        params: {
          title: "Copier",
          description: message
        }
      })
    }
  }

  const toggleOpenBrowser = async (url) => {
    await WebBrowser.openBrowserAsync(url)
  }

  const toggleCode = async (code) => {
    await Clipboard.setStringAsync(code)
    showNotificationToCopy("Code copier")
  }

  const togglePhonenumber = async (phonenumber) => {
    await Clipboard.setStringAsync(phonenumber)
    showNotificationToCopy("Numéro de téléphone copier")
  }

  const toggleEmail = async (email) => {
    await Clipboard.setStringAsync(email)
    showNotificationToCopy("Adresse mail copier")
  }

  const TEXT = children.split('\\n').map((text, index) => {
    return <ParsedText
      key={index}
      parse={
        [
          {type: 'url', style: {color: theme.colors.inverseSurface, ...styles.url}, onPress: toggleOpenBrowser},
          {type: 'phone', style: {color: theme.colors.primary, ...styles.url}, onPress: togglePhonenumber},
          {type: 'email', style: {color: theme.colors.primary, ...styles.url}, onPress: toggleEmail},
          {
            pattern: /\*\*(.*?)\*\*/g, 
            style: {}, 
            onPress: () => {}, 
            renderText: renderTextDoubleStars
          },
          {
            pattern: /```([^`]*)```/, 
            style: {...styles.wordsDoubleStars}, 
            onPress: () => {}, 
            renderText: renderTextTripleBactick
          },

        ]
      }
      {...props}
    >
      {text}
    </ParsedText>
  })

  return(
    <View style={{width: width - 60}} >
      {TEXT}
    </View>
  )
}

const styles = StyleSheet.create({
  wordsDoubleStars: {
    fontWeight: "bold"
  },
  url: {
    textDecorationLine: "underline",
  }
})

