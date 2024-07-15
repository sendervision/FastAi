import * as Crypto from "expo-crypto";
import { useFuncBot } from "./utilsNavigation";
import { imageBase64ToImage } from "./image";
import { IMessage } from "react-native-gifted-chat";
import { saveMessage } from "./database";
import { Bot } from "@/interface";
import { type SQLiteDatabase } from "expo-sqlite/next";

function getFormatMessage(
  text: string = "",
  image: string = "",
  bot: Bot,
  ...other: any | any[]
): IMessage {
  return {
    _id: Crypto.randomUUID(),
    text: text,
    createdAt: new Date(),
    image: image,
    system: true,
    user: { _id: 2, name: bot.name },
    ...other
  };
}

export async function requestResponseSendResponse(
  db: SQLiteDatabase,
  tablename: string,
  prompt: string,
  bot: Bot,
  setTyping: (v: boolean) => any,
  onSend: (messages: IMessage[]) => any,
) {
  const func_request_response = useFuncBot.getState().func;
  let msgText;
  let msgImage;
  try {
    const response = await func_request_response[0](prompt);
    if (bot.model === "text") {
      if (!response[0]) throw Error();
      msgText = response;
    } else if (bot.model === "image") {
      for (let imageBase64 of response) {
        const image = await imageBase64ToImage(
          imageBase64,
          Crypto.randomUUID()
        );
        msgImage = image;
      }
    }
  } catch (error) {
    console.log("error req func: ", error.message);
    msgText = "Erreur please try later...";
  } finally {
    const messages: IMessage = getFormatMessage(msgText, msgImage, bot)
    setTyping(false)
    onSend([messages])
    saveMessage(
      db,
      tablename,
      {
        _id: messages._id,
        text: messages.text,
        createdAt: new Date().toString(),
        image: messages.image,
        name: messages.user.name,
        user_id: 2
      }
    )
  }
}
