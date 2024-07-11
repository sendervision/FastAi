import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { showToast } from "@/utils/toast";
import { useTheme } from "react-native-paper";

export default function AccessoryBar(props) {
  const theme = useTheme();

  return (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background
        }
      ]}
    >
      <Button
        color={theme.colors.tertiary}
        onPress={() => showToast("A venir")}
        name="photo"
      />
      <Button
        color={theme.colors.tertiary}
        onPress={() => showToast("A venir")}
        name="camera"
      />
      <Button
        color={theme.colors.tertiary}
        onPress={() => {
          showToast("A venir");
        }}
        name="chat"
      />
    </View>
  );
}

const Button = ({
  onPress,
  size = 30,
  color = "rgba(0,0,0,0.5)",
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
