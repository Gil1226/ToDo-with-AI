import { AITask } from "@/types/aiTask";
import { AIAction } from "@/types/chatTypes";
import { prompt } from "./prompt";
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash-lite";

export async function askGemini(
  userMessage: string,
  tasks: AITask[],
  today: string,
): Promise<AIAction> {
  if (!API_KEY) {
    throw new Error("Missing Gemini API key. Add it to your .env file.");
  }

  

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt({userMessage, tasks, today}) }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text: string | undefined = data.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("");

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let action: AIAction;

  try {
    action = JSON.parse(text) as AIAction;
  } catch {
    throw new Error("Gemini returned invalid JSON. Please try again.");
  }

  if (
    !action ||
    !["answer", "clarify", "create_task", "reschedule_task"].includes(
      action.type,
    )
  ) {
    throw new Error("Gemini returned an unsupported action.");
  }

  if (typeof action.message !== "string") {
    throw new Error("Gemini returned an invalid message.");
  }

  return action;
}
