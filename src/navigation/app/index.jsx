import { createStackNavigator } from "@react-navigation/stack"
import { BottomNavigator } from "@/navigation/app/bottomNav"
import { ChatScreen } from "@/screens/app/chat"

const Stack = createStackNavigator()

export default function AppNavigator(){
  const listScreens = [
    {key: 1, name: "bottomnav", component: BottomNavigator},
    {key: 2, name: "chat", component: ChatScreen},
  ]

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="bottomnav"
    >
      {
        listScreens.map((screen, index) => (
          <Stack.Screen 
            key={index} 
            name={screen.name} 
            component={screen.component} 
          />
        ))
      }
    </Stack.Navigator>
  )
}
