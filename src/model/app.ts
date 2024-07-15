import { useModel } from "@/context/hook.js";
import { GPT } from "./ben.js";
import { ErrorResponse } from "./errorResponse.js";
import { Hercai } from "./hercai.js";
import { RsnChat } from "./rnschat";

const KEY = "rsnai_P9a7bTzqVxZfkvaFjkZ5PuZO";
const rsnchat = new RsnChat(KEY);
const gpt = new GPT();
export const NEGATIVE_PROMPT =
  "blury, bad quality, bad anatomy, fused fingers, malformed limbs, extra hands";

const MODEL = useModel.getState().model;
/**
 *
 * @param {string} prompt
 * @returns string
 */
export async function Chat(prompt) {
  let response;
  try {
    switch (MODEL.toLocaleLowerCase()) {
      case "gpt4":
        response = await rsnchat.gpt4(prompt);
        break;
      case "gemini":
        response = await rsnchat.gemini(prompt);
        break;
      case "bard":
        response = await rsnchat.bard(prompt);
        break;
      case "bing":
        response = await rsnchat.bing(prompt);
        break;
      case "llama":
        response = await rsnchat.llama(prompt);
        break;
      case "codellama":
        response = await rsnchat.codellama(prompt);
        break;
      default:
        response = await rsnchat.gpt(prompt);
        break;
    }
    if (response.success) return await response.message;
    else throw new Error("sucess false");
  } catch (error) {
    console.log(error.message);
    return ErrorResponse();
  }
}

export async function AbsoluteBeauty(prompt: string): Promise<string[] | any> {
  try {
    const response = await rsnchat.absolutebeauty(prompt, NEGATIVE_PROMPT);
    if (response.success) return [await response.image];
    else throw new Error("sucess false");
  } catch (error) {
    return ErrorResponse();
  }
}

export async function dalleV2(prompt: string): Promise<string | any> {
  try {
    const response = await rsnchat.dalle(prompt);
    if (response.success) {
      return [await response.image.base64];
    } else throw new Error("success false");
  } catch (error) {
    console.log("v2", error.message);
    return ErrorResponse();
  }
}

export async function AiIcon(prompt: string): Promise<string | any> {
  try {
    const response = await rsnchat.icon(prompt);
    if (response.success) return [await response.image];
    else throw new Error("success false");
  } catch (error) {
    return ErrorResponse();
  }
}

export async function HercChat(
  prompt: string,
  model: string = "v3"
): Promise<string | any> {
  try {
    const chat = new Hercai();
    const resp = await chat.question({
      model: model,
      content: prompt,
    });
    const res = await resp.json();
    return res.reply;
  } catch (error) {
    return ErrorResponse();
  }
}

export async function _gpt(
  prompt: string,
  messages = [],
  mdl = "gpt-4"
): Promise<string | any> {
  try {
    const response = await gpt.gpt({
      prompt: prompt,
      messages: messages,
      model: MODEL ? MODEL : mdl,
    });
    if (response.code === 200) return response.gpt;
    else throw new Error();
  } catch (error) {
    return ErrorResponse();
  }
}

export async function bing(prompt: string): Promise<string | any> {
  try {
    const response = await gpt.bing({ prompt });
    if (response.code === 200){
      return response.message;
    }
    else throw new Error();
  } catch (error) {
    return ErrorResponse();
  }
}

/**
 *
 * @param {string} prompt
 * @returns {list} list[base64] image
 */
export async function dalleV1(prompt: string) {
  try {
    const response = await gpt.dalleV1({ prompt });
    return response.images;
  } catch (error) {
    return ErrorResponse();
  }
}

/**
 *
 * @param {string} prompt
 * @returns {list} list[base64] image
 */
export async function _prodia(prompt: string) {
  try {
    const response = await gpt.prodia({
      prompt,
      negative_prompt: NEGATIVE_PROMPT,
    });
    let images = await response.images;
    images = images.map((image) => image.split(",")[1]);

    return images;
  } catch (error) {
    return ErrorResponse();
  }
}

/**
 *
 * @param {string} prompt
 * @returns {list} list[base64] image
 */
export async function stablediffusion(prompt: string) {
  try {
    const response = await gpt.stablediffusion({ prompt: prompt });
    console.log("response: ", response);
    // return response.images;
  } catch (error) {
    console.log(error.message);
    return ErrorResponse();
  }
}

/**
 *
 * @param {string} prompt
 * @returns {list} list[base64] image
 */
export async function stablediffusionV2(
  prompt: string
): Promise<Buffer[] | any> {
  try {
    const response = await gpt.stablediffusionV2({
      prompt,
      prompt_negative: NEGATIVE_PROMPT,
    });
    return response.images;
  } catch (error) {
    return ErrorResponse();
  }
}

export async function barman(prompt: string): Promise<string[] | any> {
  try {
    const response = await gpt.barman({ prompt });
    return [await response.text()];
  } catch (error) {
    return ErrorResponse();
  }
}
