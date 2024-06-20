import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import {
  useTheme,
  Avatar
} from 'react-native-paper'

interface IconProfilType {
  size?: number
}

export function IconProfil({size = 55}: IconProfilType) {
  const theme = useTheme()
  
  return(
    <Pressable
      style={{justifyContent: 'center', alignSelf: 'center', marginTop: 5}}
    >
      <Avatar.Image 
        source={require("@/images/profile.jpeg")}
        size={size}
        style={{backgroundColor: theme.colors.secondaryContainer}}
      />
    </Pressable>
  )
}

