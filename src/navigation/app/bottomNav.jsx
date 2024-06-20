
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomFabBar } from "rn-wave-bottom-bar"
import { Icon, useTheme } from "react-native-paper"
import { HomeScreen } from "@/screens/app/home"
import { ListChatScreen } from "@/screens/app/listChat"
import { PromptScreen } from "@/screens/app/prompt"
import { ProfileScreen } from "@/screens/app/profile"

const Tab = createBottomTabNavigator()

export function BottomNavigator(){
  const theme = useTheme()
  const listScreens = [
    {key: 1, name: "home", icon: "home", component: HomeScreen},
    {key: 2, name: "chats", icon: "wechat", component: ListChatScreen},
    {key: 3, name: "prompt", icon: "auto-fix", component: PromptScreen},
    {key: 4, name: "profile", icon: "account", component: ProfileScreen},
  ]

  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarActiveTintColor: theme.colors.secondary
      }}
      tabBar={(props) => (
        <BottomFabBar 
          bottomBarContainerStyle={{
            backgroundColor: theme.colors.onSurface,
          }} 
          {...props} 
        />
      )}
    >
      {
        listScreens.map((screen, id) => (
          <Tab.Screen
            key={id}
            name={screen.name}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Icon 
                  source={screen.icon} 
                  size={25}
                  color={focused? theme.colors.onSurface : theme.colors.primaryContainer}
                />
              ),
              tabBarIconStyle: {
                backgroundColor: "red"
              }
            }}
            component={screen.component}
          />
        ))
      }
      
    </Tab.Navigator>
  )
}
