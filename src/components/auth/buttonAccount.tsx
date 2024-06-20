
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, useTheme } from "react-native-paper";

interface ButtonAccountType {
  onPress?: () => void,
  label: string,
  disabled?: boolean
}

export function ButtonAccount({onPress, label, disabled = false}: ButtonAccountType){
  const theme = useTheme()
  const animeButton = {
    0: {
      opacity: 0,
      scale: 0.3
    },
    0.5: {
      opacity: 1,
      scale: 0.8
    },
    1: {
      opacity: 1,
      scale: 1
    }
  }
  return(
    <Animatable.View
      animation={animeButton}
      duration={700}
      style={styles.container}
    >
      <Button
        mode="contained"
        buttonColor={disabled === true? theme.colors.outline : theme.colors.tertiary }
        style={styles.button}
        labelStyle={styles.labelButton}
        onPress={disabled? null : onPress}
        rippleColor={theme.colors.tertiary}
      >
        {label}
      </Button>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  button: {
    marginHorizontal: 15,
    borderRadius:40,
    paddingVertical: 10,
  },
  labelButton: {
    fontSize: 18,
    fontFamily: "Medium",
  }
})

