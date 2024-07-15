import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { useTheme, Card, Button, Icon } from "react-native-paper";
import { Chase, Circle } from "react-native-animated-spinkit";
import * as Animatable from "react-native-animatable";
import { CopyText } from "@/utils/clipboard";
import { DataPromptImage } from "@/utils/prompts_image";
import { Head } from "@/components/head";
import { ImageComponent } from "@/components/ImageComponent";
import { ModalSelectModelImage } from "@/components/modelSelectModelImage";

const { height, width } = Dimensions.get("window");
const HEIGHT_IMAGE_PROMPT = height / 3.5;
const ANIMATION_IN_LOADER = "bounceIn";
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

function CardContent({ item }) {
  const theme = useTheme();
  const [typeLengthTextPrompt, setTypeLengthPrompt] = useState("min");

  const textPrompt = useCallback(() => {
    if (typeLengthTextPrompt === "min" && item.prompt.length > 200) {
      return item.prompt.slice(0, 200) + "...";
    } else return item.prompt;
  }, [typeLengthTextPrompt]);

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
        onPress={() => {
          setTypeLengthPrompt(typeLengthTextPrompt === "min" ? "max" : "min");
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
  const theme = useTheme();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  return (
    <>
      <ImageComponent
        source={{ uri: item.image }}
        imgHeight={isLoadingImage ? 0 : HEIGHT_IMAGE_PROMPT}
        imgWidth={WIDTH_CARD}
        onLoadStart={() => setIsLoadingImage(true)}
        onLoadEnd={() => setIsLoadingImage(false)}
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      />
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

const ButtonModelSelector = () => {
  const theme = useTheme();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const viewModel = () => {
    setIsVisibleModal(true)
  }
  return (
    <>
      <ModalSelectModelImage
        visible={isVisibleModal}
        setVisible={setIsVisibleModal}
      />
      <Button
        buttonColor={theme.colors.onSurface}
        onPress={viewModel}
        labelStyle={[
          styles.cardLabelButton,
          {
            color: theme.colors.primaryContainer,
          },
        ]}
        style={{
          paddingVertical: 2, marginLeft: 5
        }}
      >
        Utiliser ce prompt
      </Button>
    </>
  );
};

export function PromptScreen({ navigation }) {
  const theme = useTheme();
  const [countPrompts, setCountPrompts] = useState(5);

  const listData = useCallback(() => {
    return DataPromptImage.slice(0, countPrompts);
  }, [countPrompts]);

  const FooterLoader = () => {
    return (
      <Animatable.View animation={ANIMATION_IN_LOADER}>
        <Circle
          color={theme.colors.primaryContainer}
          size={50}
          style={{ alignSelf: "center" }}
        />
      </Animatable.View>
    );
  };

  // Simule un scroll infini
  const requestData = () => {
    if (countPrompts < DataPromptImage.length) {
      const searchTimeout = setTimeout(() => {
        setCountPrompts(countPrompts + 5);
      }, 3000);
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
        // initialNumToRender={5}
        onEndReached={requestData}
        ListFooterComponent={() => <FooterLoader />}
        ListFooterComponentStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => {
          return (
            <Animatable.View animation={"fadeIn"}>
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
                  <ButtonModelSelector />
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
    alignSelf: "center",
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
