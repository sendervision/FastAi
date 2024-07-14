import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Text, useTheme, Avatar } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite/next";
import { createTableImage, getProfileByName, savedProfileAi } from "@/utils/database_image";
import { downloadImageAsync } from "@/utils/image";
import * as Crypto from "expo-crypto";

const TABLENAME_PROFILE_AI = "proofile_table"

export function ItemListChat({item, onNavigateToChatScreen}){
  const theme = useTheme()
  const db = useSQLiteContext()
  const [profileImg, setProfileImg] = useState(item.url)
  const name = item.name

  const getProfileOrSaved = async () => {
    const lowername = name.toLowerCase()
    const uuid_image = Crypto.randomUUID()
    const profile = await getProfileByName(db, TABLENAME_PROFILE_AI, lowername)
    if (!profile){
      const res = await downloadImageAsync(profileImg)
      if (res?.uri){
        await savedProfileAi(
          db,
          TABLENAME_PROFILE_AI,
          {
            id: uuid_image,
            name: lowername,
            image: res.uri,
          }
        )
      }
    }
    else{
      setProfileImg(profile.image)
    }
  }

  useEffect(() => {
    (async () => {
      await createTableImage(db, TABLENAME_PROFILE_AI)
      // await getProfileOrSaved()
    })()
  }, [])

  const onLongPress = async () => {
    
  }

  const onPress = async () => {
    onNavigateToChatScreen()

  }
    
  return (
  <TouchableOpacity
    onLongPress={onLongPress}
    activeOpacity={0.9}
    onPress={onPress}
    style={{...styles.containerBot, backgroundColor: theme.colors.secondary}}
  >
    <View style={{flexDirection: 'row'}} >
      <Avatar.Image 
        source={{uri: profileImg}} 
        size={50}
        style={{
          backgroundColor: theme.colors.primaryContainer
        }}
      />
      <View style={{marginLeft: 10, marginRight: 5}} >
        <Text 
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            color: theme.colors.primaryContainer
          }} 
        >
          {item.name.length > 18? item.name.slice(0, 17) + "..." : item.name}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.outline
            }
          ]}
        >
          {item.description.length > 50? item.description.slice(0, 35) + "...": item.description}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'InterBold',
    fontSize: 30
  },
  badge: {
    position: "absolute", 
    bottom: 0, 
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  containerBot: {
    flexDirection: "row", 
    marginHorizontal: 10, 
    marginVertical: 5, 
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  description: {
    fontSize: 10,
    fontFamily: "Italic",
    letterSpacing: 0.01,
    marginTop: 5,
  }
  
})

