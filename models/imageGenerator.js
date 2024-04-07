
async function checkStatus(response) {
  if (await response.status === 200) return true
  else return false
}

const negativePrompt = "canvas frame, cartoon, 3d, ((disfigured)), ((bad art)), ((deformed)),((extra limbs)),((close up)),((b&w)), weird colors, blurry, (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), Photoshop, video game, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, 3d render"

export async function Dalle2(prompt){
  const url = "https://nexra.aryahcr.cc/api/image/complements"
  const default_options = {
    useGpu: false,
    promptImprovement: false
  }
  const handleResponse = async (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img; 
  }
  const need_slice_text = false;
  const working = true
  const headers = { 'Content-Type': 'application/json' }
  const data = {
    prompt,
    model: "dalle2",
    options: {
      gpu: default_options.useGpu,
      prompt_improvement: default_options.promptImprovement
    }
  }


  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
  console.log(await response.text())
  // return await handleResponse(await response.text())
  
  // 
}

export async function Cartoon(prompt) {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const default_options = {};
  const need_slice_text = false;
  const working = true;

  const handleResponse = async (text) => {
    const matchs = text.match(/\{(.*?)\}/);
    let img = JSON.parse(matchs[0]);
    img = img.images[0].split(';base64,').pop();
    return img;
  }

  const headers = { 'Content-Type': 'application/json' }
  const data = {
    prompt,
    model: "emi",
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })

  return await handleResponse(await response.text())
}

export async function Pixart(prompt, style="(No style)") {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const default_options = {
    negativePrompt: negativePrompt,
    imageStyle: style,
    width: 1024,
    height: 1024,
    samplingMethod: "DPM-Solver",            
    cfgScale: 4.5,
    dpmInferenceSteps: 14,
    saGuidanceScale: 3,
    saInferenceSteps: 25
  }
  const need_slice_text = false;
  const working = true;

  const headers = { 'Content-Type': 'application/json' }
        
  const data = {
    prompt,
    model: "pixart-a",
    options: {
      prompt_negative: default_options.negativePrompt,
      image_style:default_options.imageStyle,
      width: default_options.width,
      height: default_options.height,
      sampler: default_options.samplingMethod,
      dpm_guidance_scale: default_options.cfgScale,
      dpm_inference_steps: default_options.dpmInferenceSteps,
      sa_guidance_scale: default_options.saGuidanceScale,
      sa_inference_steps: default_options.saInferenceSteps
    }
  }

  const handleResponse = async (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img; 
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })

  return await handleResponse(await response.text())
}

export async function ProdiaStableDiffusion(prompt) {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const default_options = {
    negativePrompt: negativePrompt,
    model: "absolutereality_v181.safetensors [3d9d4d2b]",
    width: 1024,
    height: 1024,
    samplingMethod: "DPM++ 2M Karras",
    samplingSteps: 25,
    cfgScale: 7
  }
  const need_slice_text = false;
  const working = true;

  const headers = { 'Content-Type': 'application/json' }
      
  const data = {
    prompt,
    model: "prodia-stablediffusion",
    options: {
      prompt_negative: default_options.negativePrompt,
      model: default_options.model,
      width: default_options.width,
      height: default_options.height,
      sampling_method: default_options.samplingMethod,
      sampling_steps: default_options.samplingSteps,
      cfg_scale: default_options.cfgScale
    }
  }

  const handleResponse = async (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img; 
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })

  return await handleResponse(await response.text())
}

export async function DalleMini(prompt) {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const default_options = {};
  const need_slice_text = false;
  const working = true;

  const headers = { 'Content-Type': 'application/json' }       
  const data = {
    prompt,
    model: "dalle-mini"
  }

  const handleResponse = async (text) => {
    const matchs = text.match(/\{(.*?)\}/);
    let img = JSON.parse(matchs[0]);
    img = img.images[0].split(';base64,').pop();
    return img;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })

  return await handleResponse(await response.text())
}

export async function ProdiaStableDiffusionXL(prompt) {
  const url = "https://nexra.aryahcr.cc/api/image/complements";
  const default_options = {
    negativePrompt: negativePrompt,
    model: "sd_xl_base_1.0.safetensors [be9edd61]",
    width: 1024,
    height: 1024,
    samplingMethod: "DPM++ 2M Karras",
    samplingSteps: 25,
    cfgScale: 7
  }
  const need_slice_text = false;
  const working = true;

  const headers = { 'Content-Type': 'application/json' }   
  const data = {
    prompt,
    model: "prodia-stablediffusion-xl",
    options: {
      prompt_negative: default_options.negativePrompt,
      model: default_options.model,
      width: default_options.width,
      height: default_options.height,
      sampling_method: default_options.samplingMethod,
      sampling_steps: default_options.samplingSteps,
      cfg_scale: default_options.cfgScale
    }
  }

  const handleResponse = async (text) => {
    text = text.substring(text.indexOf('{'), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(';base64,').pop();
    return img;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
  return await handleResponse(await response.text())
}

export async function Cinematic(prompt) {
  const response = await Pixart(prompt, "cinematic")
  return response
}

async function validateApiKey() {
  const key = "rsnai_P9a7bTzqVxZfkvaFjkZ5PuZO"
  const url = "https://api.rsnai.org/api/v1/user/validate"
  const respo = await fetch(url, {
    method: "POST",
    body: JSON.stringify({key: key})
  })

  console.log(respo)

}

export async function Rsnai() {
  const url = "https://api.rsnai.org/api/v1/user/prodia"
  const key ="rsnai_P9a7bTzqVxZfkvaFjkZ5PuZO"
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${key}`
  }
  const body = {
    prompt: "Cat in space",
    negative_prompt: "blur, bad quality",
    model: "absolutereality_v181.safetensors [3d9d4d2b]"
  }

  validateApiKey()
  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(body)
  // })

  // console.log(response)
}
