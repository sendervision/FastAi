import { useTheme } from 'react-native-paper'
import { Bubble } from 'react-native-gifted-chat'

export const RenderBubble = ({props}) => {
  const theme = useTheme()
  const fontSize = 14;
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {backgroundColor: theme.colors.secondaryContainer, },
        right: {backgroundColor: theme.colors.onSurface},
      }}
      textStyle={{
        left: {
          color: theme.colors.primaryContainer, 
          fontFamily: "Medium",
          fontSize: fontSize
        },
        right: {
          color: theme.colors.primaryContainer, 
          fontFamily: "Medium",
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
