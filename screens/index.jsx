import React, { useEffect, useCallback, useState } from 'react'
import { 
  PaperProvider, 
 } from 'react-native-paper'
import { 
  InitialState,
  NavigationContainer,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { createStackNavigator } from "@react-navigation/stack"
import { PreferencesProvider } from '../context/store'
import { createNotifications } from 'react-native-notificated'
import * as SplashScreen from 'expo-splash-screen'
import * as SecureStore from 'expo-secure-store'
import NavBottom from '../screens/NavBottom'
import { NavAuth } from './NavAuth'
import { Chat } from './NavStack/chat'
import { dbChat } from '../utils/database'
import { useUserData } from '../utils/useUserData'

const Stack = createStackNavigator()

function Navigation() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="navBottom"
        component={NavBottom}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        headerOptions={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

function createTableListUserConversation() {
  dbChat.transaction(
    (tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS listconversation (tablename VARCHAR);`,
      [],
      (_, result) => {
        // console.log("Table créé avec succès")
      },
      (_, error) => {
        // console.log(`La création de la table conversation a été une echec`)
        // console.log("ERROR: ", error)
      }
    )},
    (error) => {},
    (success) => {}
  );
}

const DATAUSER_KEY = "DATASUSER"

export default function Moon() {
  const { NotificationsProvider } = createNotifications()
  const updateDatasUser = useUserData(state => state.updateDatasUser)
  const idUser = useUserData(state => state.idUser)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    createTableListUserConversation()
  }, [])

  React.useEffect(() => {
    try{
      const firstname = SecureStore.getItem("firstname")
      if (firstname) {
        updateDatasUser({firstname: firstname});
      }
    }catch(error){

    }
  }, [])
  React.useEffect(() => {
    try{
      const lastname = SecureStore.getItem("lastname")
      if (lastname) {
        updateDatasUser({lastname: lastname});
      }
    }catch(error){

    }
  }, [])
  React.useEffect(() => {
    try{
      const photoURL = SecureStore.getItem("photoURL")
      if (photoURL) {
        updateDatasUser({photoURL: {uri: photoURL}});
      }else{
        updateDatasUser({photoURL: require('../assets/avatar.png')})
      }
    }catch(error){

    }
  }, [])
  React.useEffect(() => {
    try{
      const phoneNumber = SecureStore.getItem("phonenumber")
      if (phoneNumber) {
        updateDatasUser({phonenumber: phoneNumber});
      }
    }catch(error){

    }
  }, [])
  React.useEffect(() => {
    try{
      const username = SecureStore.getItem("username")
      if (username) {
        updateDatasUser({username: username});
      }
    }catch(error){

    }
  }, [])
  React.useEffect(() => {
    try{
      const id_user = SecureStore.getItem("idUser")
      if (id_user){
        setIsAuth(true)
      }
    }catch(error){

    }
  }, [idUser])


  return(
    <PreferencesProvider>
      <React.Fragment>
        <NotificationsProvider>
          <BottomSheetModalProvider>
            {
              isAuth?
              <Navigation />:
              <NavAuth />
            }
          </BottomSheetModalProvider>
        </NotificationsProvider>
      </React.Fragment>
    </PreferencesProvider>
    
  )
}


