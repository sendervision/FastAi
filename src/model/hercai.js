const HercaiBaseUrl = "https://hercai.onrender.com/v3/hercai";
const MODEL_TEXT = ["v3", "gemini", "v3-32k", "turbo", "turbo-16k"];
const MODEL_IMAGE = ["v1","v2","v2-beta","v3","lexica","prodia","simurg","animefy","raava","shonin"]

export class Hercai {
  async question({ model = "v3", content, personality = "" }) {
    if (!MODEL_TEXT.includes(model))
      throw new Error("This model is not supported");

    if (!content || content == undefined || content == null)
      throw new Error("Please specify a question!");

    return await fetch(
      `https://hercai.onrender.com/${model}/hercai?question=` + encodeURI(content),
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "",
        },
        data: {
          personality: personality,
        },
      }
    )
  }

  async image({model = "lexica",prompt,negative_prompt=""}){
    if (!MODEL_IMAGE.includes(model)) throw new Error("model not supported");
    if(!prompt)throw new Error("Please specify a prompt!");

    const response = await fetch(`
      https://hercai.onrender.com/${model}/text2image`+"?prompt="+encodeURI(prompt)+"&negative_prompt="+encodeURI(negative_prompt),
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": "",
        },
      }
    )
    return await response
  }
}
