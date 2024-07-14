import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions, Pressable } from "react-native";
import { useTheme, Card, Button, Icon } from "react-native-paper";
import { Chase, Circle } from "react-native-animated-spinkit";
import * as Animatable from "react-native-animatable";
import { CopyText } from "@/utils/clipboard";
import { DataPromptImage } from "@/utils/prompts_image";
import { Head } from "@/components/head";
import { LightBox } from "@alantoa/lightbox";

const { height, width } = Dimensions.get("window");
const HEIGHT_IMAGE_PROMPT = height / 3.5;
const ANIMATION_IN_LOADER = "bounceIn";
const ANIMATION_OUT_LOADER = "bounceOut";
const WIDTH_CARD = width - 10;

function shuffle(array: any[]): any[] {
  const new_array = [...array];

  for (
    let currentIndex = new_array.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    [new_array[currentIndex], new_array[randomIndex]] = [
      new_array[randomIndex],
      new_array[currentIndex],
    ];
  }
  return new_array;
}

function CardContent({item}) {
  const theme =  useTheme()
  const [typeLengthTextPrompt, setTypeLengthPrompt] = useState("min")

  const textPrompt = useCallback(() => {
    if(typeLengthTextPrompt === 'min' && item.prompt.length > 200){
      return item.prompt.slice(0, 200) + "..."
    }else return item.prompt
  }, [typeLengthTextPrompt])

  return (
    <Card.Content>
      <Text
        style={[
          styles.cardSubtitle,
          {
            color: theme.colors.primaryContainer,
          },
        ]}
      >
        Prompt
      </Text>
      <Pressable
        onPress={() =>{
          setTypeLengthPrompt(typeLengthTextPrompt === "min"? "max" : "min")
        }}
      >
        <Text
          style={[
            styles.cardPrompt,
            {
              color: theme.colors.outline,
            },
          ]}
        >
          {textPrompt()}
        </Text>
      </Pressable>
    </Card.Content>
  );
}

const CoverCard = ({ item }) => {
  const theme = useTheme()
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  return (
    <>
      <LightBox
        height={isLoadingImage ? 0 : HEIGHT_IMAGE_PROMPT}
        width={WIDTH_CARD}
        imgLayout={{width: width, height: width}}
        containerStyle={{alignSelf: "center"}}
      >
        <Card.Cover
          source={{ uri: item.image }}
          style={{
            height: "100%", // isLoadingImage ? 0 : HEIGHT_IMAGE_PROMPT,
            backgroundColor: theme.colors.primaryContainer,
          }}
          onLoadStart={() => {
            setIsLoadingImage(true);
          }}
          onLoadEnd={() => {
            setIsLoadingImage(false);
          }}
        />
      </LightBox>
      {isLoadingImage && (
        <View
          style={{
            ...styles.containerActiviIndicatorCardCover,
            backgroundColor: theme.colors.primaryContainer,
            borderColor: theme.colors.primaryContainer,
          }}
        >
          <Chase color={theme.colors.secondary} size={60} />
        </View>
      )}
    </>
  );
};

export function PromptScreen() {
  const theme = useTheme();
  const [nameAnimationLoader, setNameAnimationLoader] = useState("");
  const [countPrompts, setCountPrompts] = useState(5);

  const listData = useCallback(() => {
    return DataPromptImage.slice(0, countPrompts);
  }, [countPrompts]);

  const ListFooterLoader = () => {
    if (nameAnimationLoader) {
      return (
        <Animatable.View animation={nameAnimationLoader}>
          <Circle
            color={theme.colors.primaryContainer}
            size={50}
            style={{ alignSelf: "center" }}
          />
        </Animatable.View>
      );
    }
  };

  // Simule un scroll infini
  const requestData = () => {
    if (countPrompts < DataPromptImage.length) {
      setNameAnimationLoader(ANIMATION_IN_LOADER);
      const searchTimeout = setTimeout(() => {
        setCountPrompts(countPrompts + 5);
        setNameAnimationLoader(ANIMATION_OUT_LOADER);
      }, 5000);
      return () => clearTimeout(searchTimeout);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Head
        title="Prompts"
        style={{ backgroundColor: theme.colors.secondary }}
      />
      <FlatList
        data={listData()}
        keyExtractor={(item, index) => item.title + index}
        style={{ marginVertical: 5 }}
        initialNumToRender={5}
        onEndReached={requestData}
        ListFooterComponent={ListFooterLoader}
        ListFooterComponentStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => {
          return (
            <Animatable.View animation={"fadeInLeft"}>
              <Card
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.colors.secondary,
                  },
                ]}
              >
                <CoverCard item={item} />
                <CardContent item={item} />
                <Card.Actions>
                  <Button
                    onPress={() => CopyText(item.prompt, "Prompt copier")}
                    labelStyle={[
                      styles.cardLabelButton,
                      {
                        color: theme.colors.primaryContainer,
                        fontSize: 10,
                      },
                    ]}
                    icon={() => <Icon source="content-copy" size={13} />}
                  >
                    Copier
                  </Button>
                  <Button
                    buttonColor={theme.colors.onSurface}
                    labelStyle={[
                      styles.cardLabelButton,
                      {
                        color: theme.colors.primaryContainer,
                      },
                    ]}
                  >
                    Utiliser ce prompt
                  </Button>
                </Card.Actions>
              </Card>
            </Animatable.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: WIDTH_CARD,
    marginVertical: 5,
    alignSelf: "center"
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "InterBold",
    textAlign: "left",
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Medium",
    marginTop: 10,
  },
  cardPrompt: {
    fontSize: 12,
    fontFamily: "Italic",
  },
  cardLabelButton: {
    fontSize: 10,
    fontFamily: "Medium",
  },
  containerActiviIndicatorCardCover: {
    height: HEIGHT_IMAGE_PROMPT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0,
  },
});
