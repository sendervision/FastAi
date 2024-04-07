import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  Ionicons,
  MaterialCommunityIcons,

} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

import { Home } from './home'
import { Settings } from './settings'
import { Ai } from './ai'
import { Chats } from './chats'
import { Profil } from '../profil'

const Tab = createBottomTabNavigator()
const { width, height} = Dimensions.get("window")



export default function NavBottom() {
  const theme = useTheme()
  const TabArr = [
    { route: 'Ai', label: 'Ai', type: MaterialCommunityIcons, activeIcon: 'robot', component: Ai, inActiveIcon: 'robot-outline'},
    { route: 'Home', label: 'Acceuil', type: Ionicons, activeIcon: 'home', component: Home, inActiveIcon: 'home-outline',},
    { route: 'Chats', label: 'Discussions', type: Ionicons, activeIcon: 'chatbubbles', component: Chats, inActiveIcon: 'chatbubbles-outline',},
    { route: 'Settings', label: 'Paramètres', type: Ionicons, activeIcon: 'settings', component: Settings, inActiveIcon: 'settings-outline'},
  ];
  return (
    <View style={{flex: 1}} >
      <Profil />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 65,
            paddingRight: 20,
            backgroundColor: theme.colors.secondaryContainer,
            elevation: 10,
            borderColor: theme.colors.secondary,
            borderWidth: 2,
            borderTopWidth: 2,
            // borderStyle: 'dashed',
            position: "absolute",
            bottom: 5,
            left: 0,
            right: 0,
            marginHorizontal: 10,
            borderRadius: 10,
            opacity: 1,
            shadowColor: theme.colors.primary,
            // paddingVertical: 10,
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component} label={item.label}
              options={{
                tabBarShowLabel: true,
                tabActiveTintColor: theme.colors.primary,
                tabInactiveTintColor: theme.colors.outline,
                tabBarLabel: props => {
                  return <Text
                    style={{
                      color: props.focused? theme.colors.secondary : theme.colors.outline,
                      fontSize: props.focused? 12 : 10,
                      fontFamily: "Poppins-SemiBold",
                      textAlign: 'center',
                      textAlignVertical: "center",
                      marginBottom: 5

                    }}
                  >
                    {item.label}
                  </Text>
                },
                tabBarIcon: props => (
                  <item.type 
                    name={ props.focused? item.activeIcon : item.inActiveIcon} 
                    color={props.focused? theme.colors.secondary : theme.colors.outline} 
                    size={ props.focused? 30 : props.size} 
                    style={{
                      marginTop: 10,
                      height: 30,
                      alignSelf: 'center'
                    }}
                  />
                ),
              }}
            />
          )
        })}
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    width: width / 4,
    alignItems: 'center',
    height: 80,
  }
})

