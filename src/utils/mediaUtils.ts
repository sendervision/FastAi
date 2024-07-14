import { Vibration } from "react-native"

export function vibrationAlert(duration: number | number[]){
  Vibration.vibrate(duration, true)
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