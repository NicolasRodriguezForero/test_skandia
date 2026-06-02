"use server";

import { SYSTEM_PROMPT, SUGGEST_SYSTEM, STARTER_QUESTIONS } from "./lib/prompt";

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
    return "¡Uy! Se me desconectó el mando 🎮🔌. (Falta configurar OPENROUTER_API_KEY en el servidor.)";
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
      return "¡Ups! Se me trabó un momentito el juego 🕹️. ¿Puedes intentarlo otra vez?";
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();

    return (
      reply ||
      "Mmm, me quedé sin palabras 🤔. ¿Me lo preguntas de otra forma?"
    );
  } catch (err) {
    console.error("askGizmo failed:", err);
    return "¡Ay! Se cayó la conexión ahora mismo 📡. Inténtalo de nuevo en un momento.";
  }
}

/**
 * Server Action: genera 3 preguntas sugeridas con la IA, según la conversación
 * (en especial lo último que respondió Gizmo). Devuelve siempre 3 strings;
 * ante cualquier fallo, cae a las preguntas iniciales.
 */
export async function suggestQuestions(history: ChatMessage[]): Promise<string[]> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return STARTER_QUESTIONS;

  const recent = history.slice(-8);

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
        temperature: 0.9,
        max_tokens: 150,
        messages: [
          { role: "system", content: SUGGEST_SYSTEM },
          ...recent,
          { role: "user", content: "Genera ahora las 3 preguntas sugeridas en el JSON pedido." },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) return STARTER_QUESTIONS;

    const data = await res.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";

    // Extrae el JSON aunque venga con texto/```json alrededor.
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      const list = parsed?.preguntas;
      if (Array.isArray(list)) {
        const clean = list
          .map((q) => String(q).trim())
          .filter(Boolean)
          .slice(0, 3);
        if (clean.length === 3) return clean;
      }
    }
    return STARTER_QUESTIONS;
  } catch (err) {
    console.error("suggestQuestions failed:", err);
    return STARTER_QUESTIONS;
  }
}
