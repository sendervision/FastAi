import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MotiView } from "moti"
import * as Animatable from "react-native-animatable"

export function TitleAnime (){
  const theme = useTheme()
  const anime = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 1,
      scale: 0.4,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  }
  return(
    <Animatable.View
      animation={anime}
      duration={1000}
    >
      <Text style={[styles.title, {color: theme.colors.primaryContainer}]} >
        FastAi
      </Text>
      <View style={[styles.bottomContainer, {backgroundColor: theme.colors.primaryContainer}]} >
        <Text 
          style={[
            styles.subtitle,
            {
              color: theme.colors.tertiary
            }
          ]}
        >
          Combinaison
        </Text>
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "InterBold",
    textAlign: "center",
    marginTop: 40,
  },
  bottomContainer: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "900",
  }
})
