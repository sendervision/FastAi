import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-root-toast';


export const CopyText = async (text: string, toastMessage: string) => {
    await Clipboard.setStringAsync(text)
    Toast.show(toastMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#2563EB"
    })
}
  
  
  