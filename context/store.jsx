import React, { useCallback } from 'react'
import { 
  PaperProvider, 
  MD3DarkTheme,
  MD3LightTheme,
  MD2DarkTheme,
  MD2LightTheme,
  MD2Theme,
  MD3Theme,
  useTheme,
  adaptNavigationTheme,
  configureFonts,
  Text,
} from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { 
  InitialState,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import { useKeepAwake } from 'expo-keep-awake';
import { createNotifications } from 'react-native-notificated'
import { create } from 'zustand'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';
const SECURITY_KEY = "SECURITY_STATE"
const SUPPORT_IMPORT_KEY = "SUPPORT_IMPORT_KEY"

// export const useMessageToImageScreen = create((set) => ({
//   msg: null,
//   setMsg(newMsg){
//     set({msg: newMsg})
//   }
// }))

export const PreferencesContext = React.createContext(null);

export function PreferencesProvider({children}){

  useKeepAwake();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [themeVersion, setThemeVersion] = React.useState(3);
  const [collapsed, setCollapsed] = React.useState(false);
  const [customFontLoaded, setCustomFont] = React.useState(false);
  const [rippleEffectEnabled, setRippleEffectEnabled] = React.useState(true);
  const [isSecurityActivate, setisSecurityActivate] = React.useState(false)
  const [supportImport, setSupportImport] = React.useState(false)
  const [viewMessageWithSystem, setViewMessageWithSystem] = React.useState(true)

  const theme = React.useMemo(() => {
    if (themeVersion === 2) {
      return isDarkMode ? MD2DarkTheme : MD2LightTheme;
    }

    return isDarkMode ? MD3DarkTheme : MD3LightTheme;
  }, [isDarkMode, themeVersion]);


  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require("../assets/fonts/Poppins-Black.ttf"),
    'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
    'Poppins-SemiBold': require("../assets/fonts/Poppins-SemiBold.ttf"),
    'Roboto-Italic': require("../assets/fonts/Roboto-Italic.ttf"),
    'Roboto-Regular': require("../assets/fonts/Roboto-Regular.ttf"),
    'Roboto-Medium': require("../assets/fonts/Roboto-Medium.ttf"),
  })

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || '');

        setInitialState(state);
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          setIsDarkMode(preferences.theme === 'dark');
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(SECURITY_KEY);
        const preferences = JSON.parse(prefString || '');
        if (preferences) {
          setisSecurityActivate(preferences.activate)
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(SUPPORT_IMPORT_KEY);
        const preferences = JSON.parse(prefString || '');
        if (preferences) {
          setSupportImport(preferences.activate)
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    // console.log(isSecurityActivate)
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          SUPPORT_IMPORT_KEY,
          JSON.stringify({
            activate: supportImport,
          })
        );
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [supportImport]);

  React.useEffect(() => {
    // console.log(isSecurityActivate)
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          SECURITY_KEY,
          JSON.stringify({
            activate: isSecurityActivate,
          })
        );
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [isSecurityActivate]);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem("SYSTEM_MESSAGE");
        const preferences = JSON.parse(prefString || '');
        if (preferences) {
          setViewMessageWithSystem(preferences.activate)
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    // console.log(isSecurityActivate)
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          "SYSTEM_MESSAGE",
          JSON.stringify({
            activate: viewMessageWithSystem,
          })
        );
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [viewMessageWithSystem]);


  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(
          PREFERENCES_KEY,
          JSON.stringify({
            theme: isDarkMode ? 'dark' : 'light',
          })
        );
      } catch (e) {
        // ignore error
      }
    };

    savePrefs();
  }, [isDarkMode]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
      toggleCollapsed: () => setCollapsed(!collapsed),
      toggleCustomFont: () => setCustomFont(!customFontLoaded),
      toggleRippleEffect: () => setRippleEffectEnabled(!rippleEffectEnabled),
      toggleisSecurityActivate: () => setisSecurityActivate(!isSecurityActivate),
      toggleSupportImport: () => setSupportImport(!supportImport),
      toggleViewMessageWithSystem: () => setViewMessageWithSystem(!viewMessageWithSystem),
      toggleThemeVersion: () => {
        setCustomFont(false);
        setCollapsed(false);
        setThemeVersion((oldThemeVersion) => (oldThemeVersion === 2 ? 3 : 2));
        setRippleEffectEnabled(true);
      },
      isSecurityActivate,
      supportImport,
      customFontLoaded,
      rippleEffectEnabled,
      collapsed,
      theme,
      viewMessageWithSystem,
    }),
    [
      theme, 
      collapsed, 
      customFontLoaded, 
      rippleEffectEnabled, 
      isSecurityActivate, 
      supportImport, 
      viewMessageWithSystem,
    ]
  );


  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  const configuredFontTheme = {
    ...combinedTheme,
    fonts: configureFonts({
      config: {
        fontFamily: 'Abel',
      },
    }),
  };


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError){
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return(
    <PaperProvider
      settings={{ rippleEffectEnabled: preferences.rippleEffectEnabled }}
      theme={customFontLoaded ? configuredFontTheme : theme}
    >
      <PreferencesContext.Provider value={preferences}>
        <NavigationContainer
          theme={combinedTheme}
          // initialState={initialState}
          // onStateChange={(state) =>
          //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          // }
        >
          <GestureHandlerRootView style={{flex: 1}} onLayout={onLayoutRootView}>
            {children}
            <StatusBar style={isDarkMode? 'light' : 'dark'} backgroundColor={theme.colors.background}/>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PreferencesContext.Provider>
    < /PaperProvider>
  )

} 


