import React, { useState } from "react";
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { View, Text, useColorScheme } from "react-native"
import { lightBlue, darkBlue } from "@/theme/blue"
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { RootSiblingParent } from "react-native-root-siblings"
import { StatusBar } from "expo-status-bar"
import { SQLiteProvider } from "expo-sqlite/next";
import { Navigation } from "./navigation";

export default function DBME({onLayoutRootView}){
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === 'light'
      ? { ...MD3DarkTheme, colors: {...darkBlue.colors, onSurface: "#00B489"} }
      : { ...MD3LightTheme, colors: {...lightBlue.colors, onSurface: "#00B489"} };
  
  return(
    <RootSiblingParent>
      <SQLiteProvider databaseName="convesation.db">
        <PaperProvider theme={theme} >
          <NavigationContainer>
            <GestureHandlerRootView style={{flex: 1}} >
              <BottomSheetModalProvider>
                <StatusBar style="light" backgroundColor={theme.colors.secondary} />
                  <View style={{flex: 1}} onLayout={onLayoutRootView} >
                    <Navigation />
                  </View>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </SQLiteProvider>
    </RootSiblingParent>
  )
}
