import { 
  Dalle2,
  Cartoon,
  Pixart,
  ProdiaStableDiffusion,
  DalleMini,
  ProdiaStableDiffusionXL,
  Cinematic,
  Rsnai,
} from './imageGenerator.js'

export async function generateImage(prompt, model) {
  let image = "";
  await Rsnai()
  // switch (model){
  //   case "Dalle2":
  //     image = await Dalle2(prompt)
  //     break
  //   case "Cartoon":
  //     image = await Cartoon(prompt)
  //     break
  //   case "Pixart":
  //     image = await Pixart(prompt)
  //     break
  //   case "ProdiaStableDiffusion":
  //     image = await ProdiaStableDiffusion(prompt)
  //     break
  //   case "DalleMini":
  //     image = await DalleMini(prompt)
  //     break
  //   case "ProdiaStableDiffusionXL":
  //     image = await ProdiaStableDiffusionXL(prompt)
  //     break
  //   case "Cinematic":
  //     image = await Cinematic(prompt)
  //     break
  // }
  console.log("image: ", image)
}

