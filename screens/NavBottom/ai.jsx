import React from 'react'
import { 

} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { createStackNavigator } from "@react-navigation/stack"
import { AllAi } from './Ai/allAi'
import { ListCategory } from './Ai/listCategory'

const Stack = createStackNavigator()

export function Ai() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="allai"
        component={AllAi}
        headerOptions={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="listCategory"
        component={ListCategory}
      />
    </Stack.Navigator>
  )

}


