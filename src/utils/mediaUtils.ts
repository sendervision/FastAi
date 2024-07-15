import { Vibration } from "react-native"

export function vibrationAlert(duration: number | number[],repeat: boolean = false){
  Vibration.vibrate(duration, repeat)
}

export default async function getPermissionAsync(
) {

}

export async function getLocationAsync(
) {
  
}

export async function pickImageAsync(
  onSend: (images: { image: string }[]) => void,
) {
 
}

export async function takePictureAsync(
  onSend: (images: { image: string }[]) => void,
) {

}