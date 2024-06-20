import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import * as Animatatable from "react-native-animatable"

export function OnboadingDescription(){
  const theme = useTheme()
  const animeTitle1 = {
    0: {
      opacity: 0,
      scale: 0.5
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
    <View style={styles.container} >
      <Text
        style={[styles.title1, {color: theme.colors.primaryContainer}]}
      >
        apprendre, créer et libérer votre créativité
      </Text>
      <Animatatable.Text 
        animation={"bounceInRight"} 
        style={[styles.title2, {color: theme.colors.primaryContainer}]}
      >
        Le meilleur outil incourtable pour vos créations et vos appprentissages sur l'intelligence artificielle
      </Animatatable.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    height: "70%",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title1: {
    fontSize: 30,
    fontFamily: "InterBold",
    textTransform: "uppercase"
  },
  title2: {
    fontSize: 12,
    fontFamily: "Medium",
    marginTop: 20,
  }
})
