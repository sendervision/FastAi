import { gpt, bing, dalle, prodia, stablediffusion, emi } from "gpti";

export class GPT {
  gpt({ prompt, messages = [], model = "gpt-4" }) {
    return new Promise((resolve, reject) => {
      gpt.v1(
        {
          messages: messages,
          model: model,
          markdown: false,
          prompt: prompt,
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  gptOnline({ prompt }) {
    return new Promise((resolve, reject) => {
      gpt.web({ prompt, markdown: false }, (err, data) => {
        if (err != null) reject(err);
        else resolve(data);
      });
    });
  }

  bing({ prompt }) {
    return new Promise((resolve, reject) => {
      bing(
        {
          messages: [{ role: "user", content: prompt }],
          conversation_style: "Creative",
          stream: false,
          markdown: false,
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  dalleV1({ prompt }) {
    return new Promise((resolve, reject) => {
      dalle.v1({ prompt }, (err, data) => {
        if (err != null) reject(err);
        else resolve(data);
      });
    });
  }

  prodia({ prompt, negative_prompt }) {
    return new Promise((resolve, reject) => {
      prodia.v1(
        {
          prompt,
          data: {
            model: "absolutereality_V16.safetensors [37db0fc3]",
            steps: 25,
            cfg_scale: 7,
            sampler: "DPM++ 2M Karras",
            negative_prompt: negative_prompt,
          },
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  stablediffusion({
    prompt,
    negative_prompt = "",
    model = "absolutereality_v181.safetensors [3d9d4d2b]",
    sampling_method = "DPM++ 2M Karras",
  }) {
    return new Promise((resolve, reject) => {
      prodia.stablediffusion(
        {
          prompt,
          data: {
            prompt_negative: negative_prompt,
            model: model,
            sampling_method: sampling_method,
            sampling_steps: 25,
            width: 512,
            height: 512,
            cfg_scale: 7,
          },
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  stablediffusionV2({ prompt, prompt_negative = "" }) {
    return new Promise((resolve, reject) => {
      stablediffusion.v2(
        {
          prompt,
          data: {
            prompt_negative: prompt_negative,
            guidance_scale: 9,
          },
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  emi({ prompt }) {
    return new Promise((resolve, reject) => {
      emi(
        {
          prompt,
        },
        (err, data) => {
          if (err != null) reject(err);
          else resolve(data);
        }
      );
    });
  }

  async barman({prompt, version="sd"}){
    return await fetch("https://ai.unoxdevs.fun/imagine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        version: version
      })
    });
  }
}
