import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { IconButton, useTheme } from "react-native-paper";
import { useInputMessage } from "@/context/hook";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomActions = ({ containerStyle }: Props) => {
  const theme = useTheme();
  const setInputMessage = useInputMessage((state) => state.setInputMessage);

  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        icon={"close"}
        iconColor={theme.colors.tertiary}
        size={15}
        onPress={() => setInputMessage("")}
        style={{
          borderColor: theme.colors.tertiary,
          borderWidth: 2,
          borderRadius: 20,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
});
