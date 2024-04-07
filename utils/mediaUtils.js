import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
// import * as ImageManipulator from 'expo-image-manipulator'
import * as Clipboard from "expo-clipboard"
import { create } from "zustand"
import { Alert } from 'react-native'

export const useMedia = create((set) => ({
  pickImageAsync: pickImageAsync,
  clipboard: copyToClipboard,
}))

async function copyToClipboard(text) {
  await Clipboard.setStringAsync(text)
}


export async function pickImageAsync(choice) {
  let result;
  const resultPermissionGalerie = await ImagePicker.requestMediaLibraryPermissionsAsync()
  const resultPermissionCamera = await ImagePicker.requestCameraPermissionsAsync()
  if (await resultPermissionGalerie.status !== 'granted' & await resultPermissionCamera.status !== 'granted'){
    return
  }
  if (choice === 'galerie'){
    result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
    })
  }else {
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
    })
  }

  if(!result['canceled']){
    return {uri: result["assets"][0]["uri"]}
    // result = await ImageManipulator.manipulateAsync(result["assets"][0]["uri"])
    // return result
  }
    
    
}
