import { useTheme, Text } from "react-native-paper"
import { View, StyleSheet, StatusBar } from "react-native"
import { IconProfil } from "./avatar"

interface HeadType {
  title: string,
  style?: Object
}

export function Head({title, style}: HeadType) {
  const theme = useTheme()
  return(
    <View style={[styles.containerHead, style]} >
      <Text 
        style={{
          ...styles.title, color: theme.colors.primaryContainer
        }}
      >
        {title}
      </Text>
      <IconProfil/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'InterBold',
    fontSize: 35
  },
  containerHead: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
  },
})

