import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

type DatasUser= {
  firstname: string,
  lastname: string,
  photoURL: string
}
type NewDatas= {
  key: string,
  value: string
}

export const useUserData = create((set) => ({
  username: "",
  firstname: "",
  lastname: "",
  photoURL: "",
  phonenumber: "",
  password: "",
  idUser: "",
  updateDatasUser(newDatas: NewDatas) {
    set(newDatas)
  }
}))


