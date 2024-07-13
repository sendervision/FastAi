import { useEffect, useCallback, useState, memo } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Keyboard } from "react-native";
import { Text, useTheme } from "react-native-paper"
import * as Animatable from 'react-native-animatable'
import { useInputMessage } from "@/context/hook";
import { Bot } from "@/interface";
import { prompts as PROMPT, typePrompt } from "@/utils/prompt";
import { DataPromptImage } from "@/utils/prompts_image";


const { width, height } = Dimensions.get("window")
const HEIGHT_CONTAINER = height / 11

export function RenderChatFooter({bot}: {bot: Bot}) {
  const theme = useTheme()
  const setInputMessage = useInputMessage(state => state.setInputMessage)
  const [typeAnimation, setTypeAnimation] = useState("slideInUp")

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        const timeOutDown = setTimeout(() => {
          setTypeAnimation("slideOutDown")
        }, 1000)
        return () => {
          clearTimeout(timeOutDown)
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        const timeUp = setTimeout(() => {
          setTypeAnimation("slideInUp")
        }, 500)
        return () => {
          clearTimeout(timeUp)
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  })
  
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
  

  const autoFillInput = (text: string) => {
    text = text.replace("“", "")
    setInputMessage(text)
  }

  return (
    <Animatable.View
      style={{height: HEIGHT_CONTAINER}}
      animation={typeAnimation}
    >
      <FlatList
        data={getPrompts()}
        keyExtractor={(item, index) => item + index}
        horizontal
        contentContainerStyle={{marginTop: 5, paddingHorizontal: 5}}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            onPress={() => autoFillInput(item)}
            style={[
              styles.containerPrompt,
              {
                backgroundColor: theme.colors.outlineVariant
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
    </Animatable.View>
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
