import { GoogleGenerativeAI } from '@google/generative-ai'

const api_key = "sk-OsMMq65tXdfOIlTUYtocSL7NCsmA7CerN77OkEv29dODg1EA"
const tokenGemini = "AIzaSyAY6ww3neNQm3HZAB47OFw57EcRE0n6ONA"
const responseError = "Il s'est passé une erreur veuillez vérifier si vous avez une connexion internet et si c'est le cas réessayez votre question et si l'erreur persiste contacter l'assistance technique."

export async function Gpt(model="gpt-3.5-turbo", messages) {
  const key = "HknqNW7yKi0n2BeUb0cGyAI0kZ2mKvD_DyWcHOP0SN0"
  const url = "https://api.naga.ac/v1/chat/completions"
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${key}`
  }
  const data = {
    model: model,
    messages: messages,
    max_tokens: 500
  }
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
  const result = await response.json()
  return result.choices[0].message.content
}

export async function GeminiPro(
  prompt = "Salut",
  history = []
 ) {
  const gemini = new GoogleGenerativeAI(tokenGemini)

  const model_ai = gemini.getGenerativeModel({model: "gemini-pro"})
  const chat = model_ai.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 200,
    }
  })
  const result = await chat.sendMessage(prompt)
  const response = await result.response
  const text = await response.text()
  return text
}

export async function GeminiProVision(answer=null, imageBase64=null) {
  try{
    if (!imageBase64){
      const respo = await Gpt(model="gpt-4", [{role: "user", content: answer}])
      return respo
    }
    answer = answer? answer : "Decrivez cette image"

    const tokenGemini = "AIzaSyAY6ww3neNQm3HZAB47OFw57EcRE0n6ONA"
    const gemini = new GoogleGenerativeAI(tokenGemini)

    const model = gemini.getGenerativeModel({model: "gemini-pro-vision"})
    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg"
      }
    }
    const result = await model.generateContent([answer, image])
    const response = await result.response.text()
    return response
    // Promise
  }catch(error){
    return "Il s'est passé une erreur veuillez vérifier si vous avez une connexion internet et si c'est le cas réessayez votre question et si l'erreur persiste contacter l'assistance technique."
  }
}

