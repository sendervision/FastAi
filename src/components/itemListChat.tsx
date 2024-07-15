import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite/next";
import {
  createTableImage,
  getProfileByName,
  savedProfileAi,
} from "@/utils/database_image";
import { downloadImageAsync } from "@/utils/image";
import * as Crypto from "expo-crypto";
import { LightBox } from "@alantoa/lightbox";
import { ImageComponent } from "./ImageComponent";

const { width } = Dimensions.get("window");
const TABLENAME_PROFILE_AI = "proofile_table";
const SIZE_AVATAR = 50;

export function ItemListChat({ item, onNavigateToChatScreen }) {
  const theme = useTheme();
  const db = useSQLiteContext();
  const [profileImg, setProfileImg] = useState(item.url);
  const name = item.name;

  const getProfileOrSaved = async () => {
    const lowername = name.toLowerCase();
    const uuid_image = Crypto.randomUUID();
    const profile = await getProfileByName(db, TABLENAME_PROFILE_AI, lowername);
    if (!profile) {
      const res = await downloadImageAsync(profileImg);
      if (res?.uri) {
        await savedProfileAi(db, TABLENAME_PROFILE_AI, {
          id: uuid_image,
          name: lowername,
          image: res.uri,
        });
      }
    } else {
      setProfileImg(profile.image);
    }
  };

  useEffect(() => {
    (async () => {
      await createTableImage(db, TABLENAME_PROFILE_AI);
      // await getProfileOrSaved()
    })();
  }, []);

  const onLongPress = async () => {};

  const onPress = async () => {
    onNavigateToChatScreen();
  };

  return (
    <View
      style={{
        ...styles.containerBot,
        backgroundColor: theme.colors.secondary,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <ImageComponent
          source={{ uri: item.url }}
          imgLayout={{ width: width - 30, height: width }}
          imgWidth={SIZE_AVATAR}
          imgHeight={SIZE_AVATAR}
          style={{
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: SIZE_AVATAR,
          }}
        />
        <TouchableOpacity
          style={{ marginLeft: 10, marginRight: 5 }}
          onLongPress={onLongPress}
          activeOpacity={0.9}
          onPress={onPress}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              color: theme.colors.primaryContainer,
            }}
          >
            {item.name.length > 18 ? item.name.slice(0, 17) + "..." : item.name}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: theme.colors.outline,
              },
            ]}
          >
            {item.description.length > 50
              ? item.description.slice(0, 35) + "..."
              : item.description}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "InterBold",
    fontSize: 30,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  containerBot: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  description: {
    fontSize: 10,
    fontFamily: "Italic",
    letterSpacing: 0.01,
    marginTop: 5,
  },
});
