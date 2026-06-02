"use server";

import { SYSTEM_PROMPT } from "./lib/prompt";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Server Action: único punto de "backend".
 * Recibe la conversación, llama a OpenRouter y devuelve la respuesta de Gizmo.
 * La clave nunca llega al navegador: vive solo en el servidor.
 */
export async function askGizmo(history: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return "¡Uy! Mi cofre está cerrado con llave 🔒. (Falta configurar OPENROUTER_API_KEY en el servidor.)";
  }

  // Solo conservamos los últimos turnos para no gastar de más.
  const recent = history.slice(-12);

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_NAME ?? "Gizmo Chatbot",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 400,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...recent],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("OpenRouter error:", res.status, detail);
      return "¡Ups! El cofre se trabó un momentito 🧰. ¿Puedes intentarlo otra vez?";
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();

    return (
      reply ||
      "Mmm, me quedé sin palabras 🤔. ¿Me lo preguntas de otra forma?"
    );
  } catch (err) {
    console.error("askGizmo failed:", err);
    return "¡Ay! No pude abrir el cofre ahora mismo 🗝️. Inténtalo de nuevo en un momento.";
  }
}
