import { useInputMessage } from "@/context/hook";
import { Bot } from "@/interface";
import { prompts as PROMPT, typePrompt } from "@/utils/prompt";
import { DataPromptImage } from "@/utils/prompts_image";
import { useCallback } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper"

const { width, height } = Dimensions.get("window")

export function RenderChatFooter({bot}: {bot: Bot}) {
  const theme = useTheme()
  const setInputMessage = useInputMessage(state => state.setInputMessage)
  
  const getPrompts = useCallback(() => {
    const prompts: string[] = [];
    const filterPromt = new Set();
    if (bot.model === "text"){
      for (let _pmt of typePrompt) {
        if (!filterPromt.has(_pmt)) {
          prompts.push(PROMPT[_pmt][0]);
          filterPromt.add(_pmt);
        }
      }
      return prompts
    }else if(bot.model === "image"){
      return DataPromptImage.slice(0, 15).map(pmt => pmt.prompt)
    }
  }, [])
  

  const autoFillInput = (text) => {
    setInputMessage(text)
  }

  return (
    <View
      style={{height: height / 8}}
    >
      <FlatList
        data={getPrompts()}
        keyExtractor={(item, index) => item + index}
        horizontal
        contentContainerStyle={{alignItems: "center", paddingBottom: 10}}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            onPress={() => autoFillInput(item)}
            style={[
              styles.containerPrompt,
              {
                backgroundColor: theme.colors.secondary
              }
            ]}
          >
            <Text
              style={{
                color: theme.colors.primaryContainer,
                fontSize: 12,
                fontFamily: "Inter",
              }}
            >
              {item.length > 40? item.slice(0, 40) + "..." : item}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrompt: {
    height: 40,
    maxWidth: width - 80,
    borderRadius: 5,
    marginHorizontal: 2,
    justifyContent: "center",
    paddingHorizontal: 5,
    
  }
})
