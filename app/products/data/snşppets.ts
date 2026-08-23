export type LangId = "python" | "typescript" | "openai" | "curl";

export const LANGS: { id: LangId; label: string }[] = [
  { id: "python", label: "Python" },
  { id: "typescript", label: "TypeScript" },
  { id: "openai", label: "OpenAI SDK" },
  { id: "curl", label: "cURL" },
];

export const SNIPPETS: Record<LangId, string> = {
  python: `import os
from xai_sdk import Client
from xai_sdk.chat import user

client = Client(
    api_key=os.getenv("XAI_API_KEY")
)

chat = client.chat.create(model="grok-4.6")
chat.append(user("Explain quantum computing"))

response = chat.sample()
print(response.content)`,
  typescript: `import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

const { text } = await generateText({
  model: xai.responses("grok-4.6"),
  prompt: "Explain quantum computing",
});

console.log(text);`,
  openai: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const response = await client.chat.completions.create({
  model: "grok-4.6",
  messages: [{ role: "user", content: "Explain quantum computing" }],
});

console.log(response.choices[0].message.content);`,
  curl: `curl https://api.x.ai/v1/chat/completions \\
  -H "Authorization: Bearer $XAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "grok-4.6",
    "messages": [
      { "role": "user", "content": "Explain quantum computing" }
    ]
  }'`,
};