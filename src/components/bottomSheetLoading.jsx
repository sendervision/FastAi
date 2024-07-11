import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import { Fold } from "react-native-animated-spinkit";

export function BottomSheetLoading({ bottomSheetModalRef }) {
  const theme = useTheme();
  const snapPoints = useMemo(() => ["50%", "50%"], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleStyle={{
        display: "none",
      }}
      keyboardBlurBehavior="restore"
      animateOnMount={false}
      style={{ backgroundColor: "red" }}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.secondaryContainer },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.tertiary }]}>
          Patienter
        </Text>
        <View style={{ marginTop: 50 }}>
          <Fold size={150} color={theme.colors.tertiary} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: "InterBold",
    marginTop: 20,
  },
});
