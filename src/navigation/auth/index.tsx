
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PhoneScreen } from "@/screens/auth/phoneScreen"
import { OnboardingScreen } from "@/screens/onboarding"
import { PasswordScreen } from "@/screens/auth/passwordScreen"
import { FullnameScreen } from "@/screens/auth/nameScreen"
import { ConfirmScreen } from "@/screens/auth/confirmScreen"

const Stack = createNativeStackNavigator()

export default function AuthNavigator(){

  const listScreens = [
    {key: 1, name: "onboading", component: OnboardingScreen},
    {key: 2, name: "phonenumber", component: PhoneScreen},
    {key: 3, name: "password", component: PasswordScreen},
    {key: 4, name: "fullname", component: FullnameScreen},
    {key: 5, name: "confirm", component: ConfirmScreen},
  ]

  const config = {
    animation: 'timing',
    config: {
      duration: "easing",
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };


  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="onboarding"
    >
      {
        listScreens.map(screen => (
          <Stack.Screen 
            key={screen.key} 
            name={screen.name} 
            component={screen.component} 
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
              // headerStyleInterpolator: forFade
            }}
          />
        ))
      }
    </Stack.Navigator>
  )
}
