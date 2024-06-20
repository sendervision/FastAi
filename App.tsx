import "react-native-gesture-handler"
import React, { useCallback } from 'react';
import { useFonts} from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { View, Text, StyleSheet } from 'react-native';
import DBME from "./src"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('@/fonts/Inter.ttf'),
    InterBold: require('@/fonts/InterBold.ttf'),
    Medium: require("@/fonts/medium.ttf"),
    Italic: require("@/fonts/italic.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <DBME onLayoutRootView={onLayoutRootView} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

