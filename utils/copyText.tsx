import {
  ToastAndroid, 
  Platform,
  Dimensions
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { createNotifications } from 'react-native-notificated'

const showNotificationToCopy = (message) => {
  if (Platform.OS === "android"){
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }else{
    notify("success", {
      params: {
        title: "Copier",
        description: message
      }
    })
  }
}

export const CopyText = async (text: string, toastMessage: string): undefined => {
  const { useNotifications } = createNotifications()
  const { notify } = useNotifications()
  await Clipboard.setStringAsync(text)
  showNotificationToCopy(toastMessage)
}


