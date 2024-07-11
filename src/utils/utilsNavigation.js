import { create } from "zustand";

/*
 Ce hook permet d'éviter de faire passer des élements non sérialisable (ex: function)
 dans la navigation de l'application
*/
export const useFuncBot = create((set) => ({
  func: [],
  updateFunc(f){
    set({func: f})
  }
}))
