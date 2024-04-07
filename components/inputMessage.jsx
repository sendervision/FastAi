import { useState } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

const { width, height } = Dimensions.get("window")

function SendIcon({color, ...props}) {
  return(
    <FontAwesome 
      name='send'
      size={25}
      color={color}
      {...props}
    />
  )
}

export function InputMessage({onPressCamera, onSendQuestion}) {
  const theme = useTheme()
  const [widthTextInput, setWidthTextInput] = useState("70%")
  const [valueTextInput, setValueTextInput] = useState("")
  const onChangeText = (text) => {
    if (text){
      setValueTextInput(text)
      setWidthTextInput("85%")
    }else {
      setValueTextInput(text)
      setWidthTextInput("70%")
    }
  }

  return(
    <View style={[styles.containerTextInput, {backgroundColor: theme.colors.secondaryContainer}]} >
      <TextInput
        placeholder="Entrer votre question..."
        multiline
        cursorColor={theme.colors.secondary}
        value={valueTextInput}
        onChangeText={onChangeText}
        style={{
          backgroundColor: theme.colors.secondaryContainer,
          paddingVertical: 15,
          paddingHorizontal: 5,
          // height: 80,
          maxHeight: 120,
          borderRadius: 10,
          width: widthTextInput,
          fontSize: 15,
          fontFamily: 'Poppins-SemiBold',
          color: theme.colors.secondary,
        }}
      />
      {
        !valueTextInput?
        <Ionicons
          name="camera"
          size={30}
          color={theme.colors.secondary}
          style={[styles.icon,{ backgroundColor: theme.colors.secondaryContainer}]}
          onPress={onPressCamera}
        /> : 
        <SendIcon 
          color={theme.colors.secondary} 
          style={[styles.icon,{ backgroundColor: theme.colors.secondaryContainer}]}
          onPress={() => {
            onSendQuestion(valueTextInput)
            setValueTextInput('')
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  containerTextInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%", 
    marginHorizontal: 50, 
    alignSelf: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  }
})