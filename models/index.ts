import * as Crypto from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
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

const errorMsg = "Il s'est produit une erreur veillez ressayer plus tard et si l'erreur persiste veuille contacter le service client."

const getAllMessages = (tablename) => {
  const containerMessages = []
  return(
    new Promise((resolve, reject) => {
      dbMessages.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM ${tablename};`,
            [],
            (_, { rows }) => {
              for (msg of rows._array){
                const text = msg["text"]
                if (text !== errorMsg){
                  containerMessages.push(msg)
                }
              }
              resolve(containerMessages)
            },
            (_, error) => {
              reject("Ils'est passé une erreur")
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
  let message;
  let response;
  try{
    let messages = await getAllMessages(tablename)
    if (messages.length > 5){
      messages = messages.slice(-5, -1)
    }
    if (itemBot?.model !== "gemini"){
      response = await searchResponse(messages, itemBot)
    }
  }catch(error){
    response = errorMsg
  }finally{
    message = [
      Crypto.randomUUID(),
      response, 
      new Date().toString(), 
      "", 
      "2", 
      itemBot.first_name
    ]
    setIsTyping(false)
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
    
    
  } catch(error){
    // console.log("errorIMG -> ", error)
  }finally{
    setIsTyping(false)
  }
}

