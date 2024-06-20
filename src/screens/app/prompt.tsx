import React, { useState, memo } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import {
  useTheme,
  Card,
  Button,
  Icon,
  ActivityIndicator,
} from "react-native-paper";
import { Chase } from "react-native-animated-spinkit";
import { CopyText } from "@/utils/clipboard";
import { DataPromptImage } from "@/utils/prompts_image";
import { Head } from "@/components/head";

const { width, height } = Dimensions.get("window");

export const PromptScreen = memo(() => {
  const theme = useTheme();

  const CoverCard = ({item}) => {
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    return( 
      <>
        <Card.Cover
          source={{ uri: item.image }}
          style={{height: isLoadingImage? 1 : height / 3}}
          onLoadStart={() => {setIsLoadingImage(true)}}
          onLoadEnd={() => {setIsLoadingImage(false)}}
        />
        {
          isLoadingImage &&
          <View
            style={{
              ...styles.containerActiviIndicatorCardCover,
              backgroundColor: theme.colors.primaryContainer,
            }}
          >
            <Chase color={theme.colors.secondary} size={60} />
          </View>
        }
      </>
    )
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Head
        title="Prompts"
        style={{ backgroundColor: theme.colors.secondary }}
      />
      <FlatList
        data={DataPromptImage}
        keyExtractor={(item, index) => item.title + index}
        style={{ marginVertical: 5 }}
        renderItem={({ item }) => {
          const loadingImage = true;
          return (
            <Card
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.secondary,
                },
              ]}
            >
              {/* <Card.Title 
              titleStyle={[
                styles.cardTitle,
                {
                  color: theme.colors.primaryContainer
                }
              ]}
              title={item.title} 
            /> */}
              <CoverCard item={item} />
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
                <Text
                  style={[
                    styles.cardPrompt,
                    {
                      color: theme.colors.outline,
                    },
                  ]}
                >
                  {item.prompt}
                </Text>
              </Card.Content>
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
          );
        }}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
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
    height: height / 3,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderWidth: 0
  }
});
