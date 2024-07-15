import { FlatList } from "react-native-gesture-handler";
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRef, useState } from "react";
import { Text, useTheme, IconButton } from "react-native-paper";
import { AppBarAvatar } from "@/components/appBarAvatar";
import { typePrompt, prompts } from "@/utils/prompt";
import { ComponentHomeUpdate } from "@/components/componentHomeUpdate";

const { width, height } = Dimensions.get("window");

function ComponentTypePrompt({ label, selected, onPress }) {
  const theme = useTheme();
  const colorContainer =
    selected === label
      ? theme.colors.onSurface
      : theme.colors.secondary;
  const labelColor =
    selected === label
      ? theme.colors.secondary
      : theme.colors.primaryContainer;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.componentPrompt, { backgroundColor: colorContainer }]}
    >
      <Text style={[styles.labelPrompt, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

function ComponentExamplePrompt({ prompt, title, onPressIcon, noIcon }) {
  const theme = useTheme();
  const containerColor = theme.colors.secondary;
  const titleColor = theme.colors.primaryContainer;
  return (
    <View
      style={[
        styles.containerExamplePrompt,
        { backgroundColor: containerColor },
      ]}
    >
      <Pressable>
        <Text
          style={[
            styles.labelExamplePrompt,
            { marginBottom: 10, fontSize: 16, color: titleColor },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.labelExamplePrompt,
            {
              color: theme.colors.outline,
            },
          ]}
        >
          {prompt.length > 90 ? prompt.slice(0, 100) + "..." : prompt}
        </Text>
      </Pressable>
      <View style={{height: "20%", justifyContent: 'center'}}>
        {!noIcon && (
          <IconButton
            icon={"arrow-right"}
            iconColor={theme.colors.onSurface}
            style={{ alignSelf: "flex-end" }}
            onPress={onPressIcon}
          />
        )}
      </View>
    </View>
  );
}

export function HomeScreen() {
  const theme = useTheme();
  const flatlistPromptRef = useRef(null);
  const [typePromptSelected, setTypePromptSelected] = useState(typePrompt[0]);

  const toggleTypePrompt = (label) => {
    setTypePromptSelected(label);
  };

  const goNextPrompt = (index) => {
    flatlistPromptRef.current.scrollToIndex({
      index: index + 1,
      aimated: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBarAvatar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.containerHeader]}>
          <Text
            style={[
              styles.textPrompt,
              { color: theme.colors.primaryContainer },
            ]}
          >
            Prompt populaire
          </Text>
          <Text
            style={{
              color: theme.colors.outline,
              fontSize: 14,
              fontFamily: "Medium",
            }}
          >
            Voir tout
          </Text>
        </View>
        <View>
          <FlatList
            data={Object.keys(prompts)}
            keyExtractor={(text) => text}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginBottom: 10 }}
            contentContainerStyle={{ height: 40 }}
            renderItem={({ item, id }) => (
              <ComponentTypePrompt
                key={id}
                label={item}
                selected={typePromptSelected}
                onPress={() => toggleTypePrompt(item)}
              />
            )}
          />
          <FlatList
            data={prompts[typePromptSelected]}
            keyExtractor={(text) => text}
            horizontal
            ref={flatlistPromptRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: height / 4.5 }}
            renderItem={({ item, id, index }) => (
              <ComponentExamplePrompt
                key={id}
                prompt={item}
                title={typePromptSelected}
                noIcon={index + 1 === prompts[typePromptSelected].length}
                onPressIcon={() => goNextPrompt(index)}
              />
            )}
          />
        </View>
        <ComponentHomeUpdate />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  textPrompt: {
    fontSize: 20,
    fontFamily: "Medium",
  },
  componentPrompt: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  labelPrompt: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Medium",
  },
  containerExamplePrompt: {
    width: width / 1.5,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 20,
    justifyContent: "space-around",
  },
  labelExamplePrompt: {
    fontSize: 12,
    fontFamily: "Medium",
    textAlign: "left",
  },
});
