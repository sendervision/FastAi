import "react-native-gesture-handler"
import React from 'react'
import * as Updates from "expo-updates"
import { LogBox } from 'react-native';
import Moon from "./screens";

LogBox.ignoreLogs([
  "Require cycle: screens\index.jsx -> screens\NavStack\chat.jsx -> components\renderBubble.jsx -> screens\index.jsx",

])

async function onFetchUpdateAsync() {
  try{
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable){
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
  }catch(error){

  }
}

export default function App() {
  React.useEffect(() => {
    if(!__DEV__){
      onFetchUpdateAsync()
    }
  }, [])
  return <Moon />
}

