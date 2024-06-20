import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Text, useTheme, SegmentedButtons } from "react-native-paper"
import { ButtonsSwitch } from "./buttonsSwitch"

const { width, height } = Dimensions.get("window")

export function ComponentHomeUpdate(){
  const theme = useTheme()
  const [value, setValue] = React.useState('updated');
  const values = [
    {label: "Personnalisé", value: "noUpdated"},
    {label: "Automatique", value: "updated"}
  ]

  return(
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.tertiary
        }
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.secondary
          }
        ]}
      >
        Mise à jour Disponible
      </Text>
      <View style={{paddingLeft: 10, marginTop: 10}} >
        <Text style={[styles.subtitle, {color: theme.colors.secondary}]}>Les nouvelles ai disponible</Text>
        <Text style={[styles.subtitle, {color: theme.colors.secondary}]}>Les nouvelles fonctionalité</Text>
        <Text style={[styles.subtitle, {color: theme.colors.secondary}]}>Les avancés technologique</Text>
      </View>
      <ButtonsSwitch values={values} value={value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height / 3.7,
    width: width - 20,
    alignSelf: 'center',
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "InterBold",
    textTransform: "uppercase"
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Medium",
  },
  segmentedButtons: {
    marginTop: 10,
    alignSelf: "center",
  }
})
