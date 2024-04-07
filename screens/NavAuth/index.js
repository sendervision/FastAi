import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack'
import { useTheme, Text } from 'react-native-paper'
import { View } from 'react-native'
import Starter from './starter'
import Login from './login'
import Signin from './signin'
import AskName from './askName'
import AskImageProfile from './askImageProfile'
import TermConditions from './termConditions'
import AskPhoneNumber from './askPhoneNumber'
import AskPassword from './askPassword'

const Stack = createStackNavigator()

export function NavAuth() {
  const theme = useTheme()
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background},
      }}
      animationEnabled={true}
      animationTypeForReplace="push"
      gestureVelocityImpact={0}
      initialRouteName="starter"
    >
      <Stack.Screen 
        name="starter" 
        component={Starter}
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen 
        name="login" 
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="signin" 
        component={Signin}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="askName" 
        component={AskName}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="askPhoneNumber" 
        component={AskPhoneNumber}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="askPassword" 
        component={AskPassword}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="askImageProfile" 
        component={AskImageProfile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="termConditions" 
        component={TermConditions}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}



