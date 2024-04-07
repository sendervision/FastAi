import * as SQLite from 'expo-sqlite'
import { create } from 'zustand'

// tablename of list chat = listconversation
export const dbChat = SQLite.openDatabase("conversations.db")
export const dbMessages = SQLite.openDatabase("messages.db")

export const useUserConversation = create((set) => ({
  listUsersToChat: [],
  toggleListUsersToChat(newList){
    set({listUsersToChat: newList})
  }
}))

