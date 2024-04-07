import { create } from 'zustand'
import React from 'react'

type modalStore = {
  isOpen: boolean,
  bottomSheetRef: React.RefObject;
  toggleModal: () => void
}

export const useModalProfil = create((set, get) => ({
  isOpen: false,
  bottomSheetRef: React.createRef(),
  iconName: "account",
  toggleModal: () => {
    set((state) => ({ isOpen: !state.isOpen}));
    if (!get().isOpen){
      get().bottomSheetRef.current?.close()
    }else{
      get().bottomSheetRef.current.present()
    }
  }
}))

