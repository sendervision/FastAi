import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useModel = create((store) => ({
  model: "",
  updateModel(param){
    store(param)
  }
}))

export const useVisibleBannerBot = create((store) => ({
  isVisible: false,
  setIsVisible(visible){
    store({isVisible: visible})
  }
}))

export const useInputMessage = create((store) => ({
  inputMessage: "",
  setInputMessage(text){
    store({inputMessage: text})
  }
}))

const getUserData = async () => {
  const response = await AsyncStorage.getItem("dataUser")
  if (response !== null){
    return JSON.parse(response)
  }
}

export const useUser = create(async (state) => {
  // const dataUser = await getUserData()
  return {
    firstname: "", // dataUser.firstname,
    lastname: "", // dataUser.lastname,
    phonenumber: "", // dataUser.phonenumber,
    profile: "", // dataUser.profile,
    updateUseUser(user){
      state(user)
    }
  }
})

