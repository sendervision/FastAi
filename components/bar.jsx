import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get("window")

export function Bar({left, right, style}) {

  return(
    <View style={[styles.container, {...style}]}>
      <View style={styles.containerIcon} >
        {left}
      </View>
      <View style={styles.containerIcon}>
        {right}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
  containerIcon: {
    flexDirection: "row",
    justifyContent: 'space-around',
  }
})

