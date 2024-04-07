import * as MediaLibrary from "expo-media-library"
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import { dbMessages } from './database'

function filterConversation(conversations) {
  return conversations.map(conv => {
    const msg = {
      createdAt: conv.createdAt,
      nom: conv.name,
      message: conv.text
    }
    return msg
  })
}

function getAllConversation(tablename: string) {
  return(
    new Promise((resolve, reject) => {
      dbMessages.transaction(
      tx => {
        tx.executeSql(`SELECT * FROM ${tablename};`,
          [],
          (_, { rows }) => {
            resolve(rows._array)
          },
          (_, error) => {
            reject(error)
            // console.log("Error: ", error)
          }
        )
      },
      error => {
        // console.log("ERROR", error)
      },
      success => {
        // console.log("SUCCESS", success)
      }
    )
    })
  )
}

export async function ExportConversation(tablename: string) {
  let { status } = await MediaLibrary.requestPermissionsAsync()
  if (status !== "granted"){
    alert('Veuillez accorder cette permission pour exporter cette conversation')
    status = await MediaLibrary.requestPermissionsAsync()
    if (status !== "granted") return
  }
  
  try{
    const conversations = await getAllConversation(tablename)
    const MSG = filterConversation(conversations)
    if (MSG){
      const data = JSON.stringify(MSG)
      let fileUri = FileSystem.documentDirectory + "conversation" + new Date().getTime().toString() + ".txt"
      await FileSystem.writeAsStringAsync(fileUri, data, {encoding: FileSystem.EncodingType.UTF8})
      await MediaLibrary.saveToLibraryAsync(fileUri)
      // const asset = await MediaLibrary.createAssetAsync(fileUri)
      // await MediaLibrary.createAlbumAsync("Download", asset)
    }
  }catch(error){
    // console.log("error: ", error)
  }
}

