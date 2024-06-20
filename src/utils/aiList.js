import {
  Chat,
  _gpt,
  gptOnline,
  AiIcon,
  dalleV1,
  dalleV2,
  stablediffusion,
  stablediffusionV2,
  _prodia,
  NEGATIVE_PROMPT
} from "@/model/app";
import { getBase64Image } from "@/utils/image"
import { modelProdia } from "@/model/mdl"
import axios from "axios";

const herc_image = async (prompt, model="lexica") => {
  const response = await axios.request({
    method: "GET",
    url: `https://hercai.onrender.com/${model}/text2image`,
    params: {prompt: prompt, negative_prompt: NEGATIVE_PROMPT},
    headers: {Authorization: ''}
  })
  const urlImage = response.data.url
  const imagebase64 = await getBase64Image(urlImage)
  return [imagebase64]
}

export const listAi = [
  {
    name: "ChatGPT4",
    description: "ChatGPT 4, créé par OpenAI, est un chatbot puissant. Il s'agit de la nouvelle génération de ChatGPT et est réputé pour sa capacité à produire du texte de haute qualité en réponse à diverses invites et questions, ce qui en fait une IA conversationnelle précieuse.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
    model: "text",
    models: ["gpt-4", "gpt-4-0613", "gpt-4-32k", "gpt-4-0314", "gpt-4-32k-0314"],
    func: [_gpt]
  },
  {
    name: "Llama",
    description: "Llama est un model open-source développer par Meta(Facebook) qui est spécialisé pour des longues conversations et des calculs",
    url: "https://pngimg.com/d/meta_PNG5.png",
    model: "text",
    models: ["llama", "codellama"],
    func: [Chat]
  },
  {
    name: "Bing",
    description: "Bing est un model crée par microsoft spécialisé pour des conversation longues et la création des images. Il permet aussi de donnée des informations en qui sont à jour",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Bing_New_Logo.png",
    model: "text",
    models: ["bing"],
    func: [Chat, gptOnline]
  },
  {
    name: "HercAi",
    description: "HercAi est une ai spécialisé dans la création d'image et possède plusieurs models",
    url: "https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-artificial-intelligence-robot-illustration-png-image_6654937.png",
    model: "image",
    models: ["raava", "lexica","prodia","simurg","animefy","shonin"],
    func: [herc_image]
  },
  {
    name: "ProdiAI",
    description: "Prodia est une ai spécialisé dans la création d'image avec une multitude des models",
    url: "https://miro.medium.com/v2/resize:fit:1400/1*VcrrNXYOXbtnZqQ9R_Svbw.png",
    model: "image",
    models: modelProdia,
    func: [_prodia]
  },
  {
    name: "Dalle-3",
    description: "DALL-E 3 est la dernière itération du modèle d'IA révolutionnaire d'OpenAI, spécialisé dans la génération d'images basées sur des descriptions textuelles.",
    url: "https://assets-global.website-files.com/64f2fa44b0818c378b17052e/65c4e3a0951283b0c2355eb1_20240208T0220-0ee7f525-bc24-4a72-a6c4-b287ba72893e.png",
    model: "image",
    models: ["v2", "v1"],
    func: [dalleV2, dalleV1],
  },
  {
    name: "Stablediffusion",
    description: "Cette ai est connu pour sa génération d'image accès réaliste",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmZPQ521IQbZgeN_9bL_Nn5XrBHssJpO39vw&s",
    model: "image",
    models: ["v2", "v1"],
    func: [stablediffusionV2, stablediffusion],
  },
  {
    name: "AiIcon",
    description: "AiIcon est une ai spécialisé dans la création des logos et des îcones",
    url: "https://cdn.vectorstock.com/i/500p/33/66/artificial-intelligence-icon-sign-logo-vector-49693366.jpg",
    model: "image",
    models: [],
    func: [AiIcon],
  },
]
