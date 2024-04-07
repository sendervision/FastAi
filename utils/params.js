import React from 'react'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

const messageNoSupportedAuth = `
  Vous ne pouvez pas faire d'import parce que votre appareil ne supporte pas 
  les authentifications par empreite digital ou l'authentification faciale`

async function authentication(argument) {
  return await LocalAuthentication.authenticateAsync({
    cancelLabel: "Annuler",
    promptMessage: "Veuillez confirmer que c'est bien vous.",
  })
}

export async function checkPermissionsToSecurity(isSecurityActivate, toggleSupportImport) {
  if (!isSecurityActivate){
    alert("Vous devez activez la sécurité pour pouvoir exporter des données de cette application")
    return
  }
  if (await !LocalAuthentication.hasHardwareAsync()){
    alert(messageNoSupportedAuth)
    return
  }
  const respone = await authentication()
  if (await respone["success"]){
    toggleSupportImport()
  }
}

export const useSettings = create((set) => ({
  fontSize: 16
}))
