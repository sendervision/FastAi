import * as React from "react";
import {
  Portal,
  Text,
  useTheme,
  Dialog,
  Button,
  TouchableRipple,
} from "react-native-paper";
import { ScrollView } from "react-native";
import { listAi } from "@/utils/aiList";
import { useNavigation } from "@react-navigation/native";
import { useFuncBot } from "@/utils/utilsNavigation";
import { useModel } from "@/context/hook";

export function ModalSelectModelImage({ visible, setVisible }) {
  const useNavigationParent = useNavigation().getParent();
  const theme = useTheme();
  const updateModel = useModel(state => state.updateModel)
  const updateFuncBot = useFuncBot(state => state.updateFunc)
  const List_Ai_Image = listAi.filter((ai) => ai.model === "image");
  const hideDialog = () => setVisible(false);

  const onNavigateToChatScreen = (item: { models: any[], func: any[] }) => {
    hideDialog()
    updateModel({model: item.models[0]})
    updateFuncBot(item.func)
    const bot = {...item, func: null}
    useNavigationParent.navigate("chat", {item: bot})
  }

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
        <Text
          style={{
            color: theme.colors.onSurface,
            fontSize: 18,
            fontFamily: "InterBold",
            marginLeft: 40,
          }}
        >
          Choisi le model
        </Text>
        <Dialog.Content>
          <ScrollView style={{ maxHeight: "100%", marginTop: 5 }}>
            {List_Ai_Image.map((mdl, index) => {
              return (
                <TouchableRipple key={index} onPress={() => { onNavigateToChatScreen(mdl) }}>
                  <Text
                    style={{
                      fontFamily: "Medium",
                      fontSize: 16,
                      color: theme.colors.primaryContainer,
                      marginVertical: 10,
                      marginHorizontal: 10,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    {mdl.name}
                  </Text>
                </TouchableRipple>
              );
            })}
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            labelStyle={{
              fontFamily: "Medium",
              color: theme.colors.primaryContainer,
            }}
            onPress={hideDialog}
          >
            Annuler
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

