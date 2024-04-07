import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import {
  useTheme,
  IconButton,
  Avatar
} from 'react-native-paper'
import { useModalProfil } from '../context/storeProfil'
import { useUserData } from '../utils/useUserData'

export function IconProfil({icon}) {
  const theme = useTheme()
  const toggleModal = useModalProfil(state => state.toggleModal)
  const photoURL = useUserData(state => state.photoURL)
  
  return(
    <Pressable onPress={toggleModal} 
      style={{justifyContent: 'center', alignSelf: 'center', marginTop: 5}}
    >
      <Avatar.Image 
        source={photoURL}
        size={45}
        mode="contained"
        iconColor={theme.colors.secondary}
        style={{backgroundColor: theme.colors.secondaryContainer}}
      />
    </Pressable>
  )
}
