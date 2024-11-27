require("dotenv").config();

import { OpenAI } from "openai";
import Anthropic from "@anthropic-ai/sdk";

async function main() {
  // const anthropic = new Anthropic({
  //   baseURL: "http://localhost:58274",
  //   apiKey: process.env.ANTHROPIC_API_KEY,
  // });

  // const response = await anthropic.messages.create({
  //   model: "claude-3-opus-20240229",
  //   max_tokens: 1024,
  //   messages: [{ role: "user", content: "Hello, world" }],
  //   // stream: true,
  // });

  // console.log(response);

  // return;

  const openai = new OpenAI({
    apiKey: process.env.ANTHROPIC_API_KEY,
    // baseURL: "https://gateway.llmmapper.com/oai2ant/v1",
    baseURL: "http://localhost:8787/oai2ant/v1",
    defaultHeaders: {
      "Helicone-Target-Url": "https://gateway.llmmapper.com",
    },
  });
  const model = "claude-3-haiku-20240307";
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Tell me a short joke about programming.",
        },
      ],
      max_tokens: 100,
      stream: true,
    });

    // console.log(chatCompletion.choices[0].message.content);
    for await (const chunk of chatCompletion) {
      console.log(JSON.stringify(chunk.choices[0].delta.content));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
