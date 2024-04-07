import { useContext } from 'react'
import { useTheme } from 'react-native-paper'
import { Bubble } from 'react-native-gifted-chat'
import { useSettings } from '../utils/params'
import { PreferencesContext } from '../context/store'

export const RenderBubble = ({props}) => {
  const theme = useTheme()
  const fontSize = useSettings((state) => state.fontSize)
  const {
    theme: { dark: isDarkTheme }
  }  = useContext(PreferencesContext)
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {backgroundColor: theme.colors.secondaryContainer, },
        right: {backgroundColor: theme.colors.primary},
      }}
      textStyle={{
        left: {
          color: isDarkTheme? "#fff" : theme.colors.seondaryContainer, 
          fontFamily: "Roboto-Medium",
          fontSize: fontSize
        },
        right: {
          color: !isDarkTheme? "#fff" : theme.colors.seondaryContainer, 
          fontFamily: "Roboto-Medium",
          fontSize: fontSize
        }
      }}
      bottomContainerStyle={{
        left: { margin: 3 },
        right: { margin: 3 },
      }}
      tickStyle={{}}
    />
  )
}
