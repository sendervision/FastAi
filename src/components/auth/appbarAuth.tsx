import React, {} from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  Appbar,
  useTheme,
} from "react-native-paper"

interface AppBarAuthType {
  title?: string,
  onPressBack: () => void,
}

const { width } = Dimensions.get("window")

export function AppBarAuth<AppBarAuthType>({title, onPressBack}){
  const theme = useTheme()

  return(
    <Appbar
      style={{backgroundColor: theme.colors.secondaryContainer, paddingTop: 20, height: "12%"}}
      type="large"
    >
      <Appbar.BackAction 
        color={theme.colors.primaryContainer}
        onPress={onPressBack}
      />
      <Appbar.Content 
        title={title} 
        color={theme.colors.primaryContainer}
        titleStyle={styles.title}
      />

    </Appbar>
  )
}

const styles = StyleSheet.create({
  title: {
    marginLeft: width / 5, 
    fontFamily: "InterBold", 
    fontSize: 16,
  }
})
