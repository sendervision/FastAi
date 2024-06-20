import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BottomNavigator } from "@/navigation/app/bottomNav"
import { ChatScreen } from "@/screens/app/chat"

const Stack = createNativeStackNavigator()

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
        listScreens.map(screen => (
          <Stack.Screen 
            key={screen.key} 
            name={screen.name} 
            component={screen.component} 
          />
        ))
      }
    </Stack.Navigator>
  )
}
