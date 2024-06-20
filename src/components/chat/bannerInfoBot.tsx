import { useVisibleBannerBot } from "@/context/hook";
import { Bot } from "@/interface";
import * as React from "react";
import { Image } from "react-native";
import { Banner, Text, useTheme } from "react-native-paper";

export function BannerInfoBot({ bot }: { bot: Bot }) {
  const theme = useTheme();
  const { isVisible, setIsVisible } = useVisibleBannerBot();

  return (
    <Banner
      visible={isVisible}
      actions={[
        {
          label: "Fermer",
          onPress: () => setIsVisible(false),
          textColor: theme.colors.primaryContainer,
          labelStyle: {fontFamily: "Inter"},
        },
      ]}
      contentStyle={{ backgroundColor: theme.colors.onSurfaceDisabled }}
      icon={({ size }) => (
        <Image
          source={{
            uri: bot.url,
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: theme.colors.primaryContainer,
          }}
        />
      )}
    >
      <Text
        style={{
          fontFamily: "Medium",
          color: theme.colors.primaryContainer,
          fontSize: 12,
        }}
      >
        {bot.description}
      </Text>
    </Banner>
  );
}
