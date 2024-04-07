import * as Crypto from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { generateImage as getImages } from "./imageModel"
import { Gpt, GeminiPro, GeminiProVision } from './gemini'
import { dbMessages } from '../utils/database'

type ItemBot = {
  first_name: string,
  category: string,
  desc: string,
  model: string,
  image: string,
  system: string
}

const getAllMessages = (tablename) => {
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

const saveMessage  = (message, tbName) =>{
  dbMessages.transaction(
    (tx) => {
       tx.executeSql(`INSERT INTO ${tbName} (_id, text, createdAt, image, user_id, name) VALUES (?, ?, ?, ?, ?, ?);`,
        [...message],
        (_, result) => {
          // console.log("Sauvegarder avec succès")
        },
        (_, error) => {
          // console.log("Ils s'est produit une erreur")
        },
      )
    },
    null,
 );
};

async function searchResponse(messages: [], itemBot: ItemBot) {
  const MessageSystem = {role: "system", content: itemBot.system}  
  let ContainerMessage = []

  for (let message of messages){
    if (message.text){
      const msg = {
        role: parseInt(message.user_id) === 1? "user" : "assistant",
        content: message.text
      }
      ContainerMessage.push(msg)
    }
  }

  ContainerMessage.unshift(MessageSystem)
  const model = itemBot?.model? itemBot.model : "gpt-3.5-turbo"
  const response: string = await Gpt(model, ContainerMessage)
  return response
}


export async function getResponse(
  question, 
  tablename, 
  itemBot, 
  setIsTyping,
  saveMessage_,
) {
  
  let messages = await getAllMessages(tablename)
  if (messages.length > 5){
    messages = messages.slice(-5, -1)
  }
  if (itemBot?.model !== "gemini"){
    const response = await searchResponse(messages, itemBot)
    setIsTyping(false)
    const message = [
      Crypto.randomUUID(),
      response, 
      new Date().toString(), 
      "", 
      "2", 
      itemBot.first_name
    ]
    saveMessage_(message, tablename)
  }
}

export async function getResponseGemini(
  question: string, 
  image: string,
  tablename: string, 
  itemBot: ItemBot, 
  setIsTyping: boolean,
  saveMessage_: () => void,
) {

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: "base64"
  })
  const response = await GeminiProVision(question, base64)
  setIsTyping(false)
  const message = [
    Crypto.randomUUID(),
    response, 
    new Date().toString(), 
    "", 
    "2", 
    itemBot.first_name
  ]
  saveMessage_(message, tablename)
}

export async function generateImage(
  prompt, 
  tablename, 
  itemBot, 
  setIsTyping,
  saveMessage_
) {
  try{
    // const key = "HknqNW7yKi0n2BeUb0cGyAI0kZ2mKvD_DyWcHOP0SN0"
    // const url = "https://api.naga.ac/v1/images/generations"
    // const headers = {
    //   "Content-Type": "application/json",
    //   "Authorization": `Bearer ${key}`
    // }
    // const data = {
    //   model: "dalle-e-3",
    //   prompt: prompt,
    //   size: "1024x1024",
    //   n: 1
    // }
    // let response = await fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(data)
    // })
    // const result = await response.json()
    // console.log("naga", result)

    const nameImg = prompt.split(" ").slice(0, 5).join('')
    const nameImage = nameImg.replace(/[^\w\s]/g, "") + new Date().getTime().toString() + ".jpg"

    const fileDir = FileSystem.documentDirectory + nameImage
    response = await getImages(prompt, itemBot?.model)
    // console.log("response", response)

    // await FileSystem.writeAsStringAsync(fileDir, response, {encoding: FileSystem.EncodingType.Base64})
    // await MediaLibrary.saveToLibraryAsync(fileDir)

    // console.log(fileDir)

    // const message = [
    //   Crypto.randomUUID(),
    //   prompt,
    //   new Date().toString(),
    //   fileDir,
    //   "2",
    //   itemBot?.first_name
    // ]

    // saveMessage_(message, tablename)
    
  } catch(error){
    console.log("errorIMG -> ", error)
  }finally{
    setIsTyping(false)
  }
}

