
import { create } from "zustand";

export const useUserData = create((set) => ({
  phonenumber: "",
  password: "",
  firstname: "",
  lastname: "",
  updateUser(newData){
    set(newData)
  }
}))
