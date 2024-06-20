import * as React from "react";
import {
  Portal,
  Text,
  useTheme,
  Dialog,
  RadioButton,
  IconButton,
  Tooltip,
} from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import { useModel } from "@/context/hook";

export function ModalModel({ visible, setVisible, models }) {
  const theme = useTheme();
  const [valueSelected, setValueSelected] = React.useState(models[0]);
  const hideDialog = () => setVisible(false);

  const { updateModel } = useModel();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{
          backgroundColor: theme.colors.secondary,
          maxHeight: "60%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.tertiary,
              fontSize: 18,
              fontFamily: "InterBold",
              marginLeft: 40,
            }}
          >
            Model
          </Text>
          <View
            style={{
              justifyContent: "flex-start",
              marginRight: 30,
              alignSelf: "center",
            }}
          >
            <Tooltip title="Fermer">
              <IconButton
                icon={"selection-ellipse-remove"}
                iconColor={theme.colors.primary}
                size={30}
                onPress={hideDialog}
              />
            </Tooltip>
          </View>
        </View>
        <Dialog.Content>
          <RadioButton.Group
            onValueChange={(value) => {
              setValueSelected(value);
              updateModel({ model: value });
            }}
            value={valueSelected}
          >
            <ScrollView
              style={{ maxHeight: "90%" }}
            >
              {models.map((mdl, index) => (
                <RadioButton.Item
                  key={index}
                  label={mdl}
                  value={mdl}
                  labelStyle={{
                    fontFamily: "Medium",
                    fontSize: 14,
                    textTransform: "capitalize",
                    color: theme.colors.primaryContainer,
                  }}
                  rippleColor={theme.colors.tertiary}
                  color={theme.colors.tertiary}
                  uncheckedColor={theme.colors.primaryContainer}
                />
              ))}
            </ScrollView>
          </RadioButton.Group>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: "90%",
    alignSelf: "center",
  },
});
