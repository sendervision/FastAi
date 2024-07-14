import React from "react";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { View } from "react-native";
import { darkBlue } from "@/theme/blue";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite/next";
import { LightBoxProvider } from "@alantoa/lightbox";
import { Navigation } from "./navigation";

export default function DBME({ onLayoutRootView }) {
  const theme = {
    ...MD3DarkTheme,
    colors: { ...darkBlue.colors, onSurface: "#00B489" },
  };

  return (
    <RootSiblingParent>
      <SQLiteProvider databaseName="convesation.db">
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <LightBoxProvider>
                <BottomSheetModalProvider>
                  <StatusBar
                    style="light"
                    backgroundColor={theme.colors.secondary}
                  />
                  <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                    <Navigation />
                  </View>
                </BottomSheetModalProvider>
              </LightBoxProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </SQLiteProvider>
    </RootSiblingParent>
  );
}
