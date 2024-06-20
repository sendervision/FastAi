import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";
import {
  Appbar,
  Avatar,
  IconButton,
  Menu,
  useTheme,
  Text,
  Icon,
} from "react-native-paper";
import { ModalModel } from "./chat/modalModel";
import { Bot } from "@/interface";
import { useVisibleBannerBot } from "@/context/hook";

export function NavBar({ bot }: {bot: Bot}) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [visibleModalModel, setVisibleModalModel] = React.useState(false)
  const { setIsVisible: setVisibleBannerInfoBot } = useVisibleBannerBot()

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  
  const onPressModelMenu = () => {
    setVisible(false)
    setVisibleModalModel(true)
  }

  const onVisibleBannerInfoBot = () => {
    setVisible(false)
    setVisibleBannerInfoBot(true)
  }

  const optionsMenu = [
    {title: "Model", icon: "pickaxe", onPress: onPressModelMenu, conditionRender: bot.models.length > 0},
    {title: "Info", icon: "information", onPress: onVisibleBannerInfoBot, conditionRender: true},
  ]

  return (
    <Appbar.Header
      mode="small"
      style={{ backgroundColor: theme.colors.secondary }}
    >
      <Appbar.BackAction
        color={theme.colors.primaryContainer}
        onPress={() => navigation.goBack()}
      />
      <Avatar.Image
        source={{ uri: bot.url }}
        size={40}
        style={{
          marginHorizontal: 10,
          backgroundColor: theme.colors.primaryContainer,
        }}
      />
      <ModalModel
        visible={visibleModalModel}
        setVisible={setVisibleModalModel}
        models={bot.models}
      />
      <View
        style={{
          flexDirection: "row",
          width: "65%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 18,
              color: theme.colors.primaryContainer,
            }}
          >
            {bot.name}
          </Text>
          <Text
            style={{
              color: theme.colors.tertiary,
              fontFamily: "InterBold",
              textTransform: "capitalize",
            }}
          >
            {bot.model}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{ backgroundColor: theme.colors.secondary }}
            anchor={
              <IconButton
                iconColor={theme.colors.primaryContainer}
                onPress={openMenu}
                size={25}
                icon={"dots-vertical"}
              />
            }
          >
            {
              optionsMenu.map((option, index) => (
                option.conditionRender &&
                <Menu.Item 
                  key={index}
                  onPress={option.onPress} 
                  title={option.title}
                  titleStyle={{color: theme.colors.primaryContainer, fontFamily: "Inter", fontSize: 14}}
                  trailingIcon={() => <Icon source={option.icon} size={25} color={theme.colors.primaryContainer} />}
                />

              ))
            }
          </Menu>
        </View>
      </View>
    </Appbar.Header>
  );
}
