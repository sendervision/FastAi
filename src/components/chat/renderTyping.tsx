import { Dimensions, View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = 10;

const Circle = ({ index }) => {
  const theme = useTheme(); 
  return (
    <Animatable.View
      animation={"fadeOut"}
      iterationCount={"infinite"}
      delay={1000}
      style={[
        styles.circle,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
    />
  );
};

export function RenderTyping({ name }: { name?: string }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.secondary,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3].map((i) => (
          <Circle key={i} index={i} />
        ))}
      </View>
      {name && (
        <Text
          style={{
            fontFamily: "Italic",
            fontSize: 10,
            color: theme.colors.primaryContainer,
            marginTop: 10,
          }}
        >
          {name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 3,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE,
    marginHorizontal: 2,
  },
});
