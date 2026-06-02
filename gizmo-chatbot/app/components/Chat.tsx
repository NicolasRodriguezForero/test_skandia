"use client";

import { useEffect, useRef, useState } from "react";
import { askGizmo, suggestQuestions, type ChatMessage } from "../actions";
import { STARTER_QUESTIONS, WELCOME_MESSAGE } from "../lib/prompt";
import GizmoMascot from "./GizmoMascot";

// Resalta las palabras clave "forward" y "cobertura".
function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\bforwards?\b|\bcoberturas?\b)/gi);
  return (
    <>
      {parts.map((part, i) => {
        const low = part.toLowerCase();
        if (low === "forward" || low === "forwards") {
          return (
            <span key={i} className="font-extrabold text-neon-lime">
              {part}
            </span>
          );
        }
        if (low === "cobertura" || low === "coberturas") {
          return (
            <span key={i} className="font-extrabold text-neon-cyan">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Las 3 preguntas sugeridas: arrancan estáticas y luego las genera la IA.
  const [suggestions, setSuggestions] = useState<string[]>(STARTER_QUESTIONS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await askGizmo(next);
      const withReply: ChatMessage[] = [...next, { role: "assistant", content: reply }];
      setMessages(withReply);
      // La IA propone 3 preguntas nuevas según lo último que se habló.
      const nuevas = await suggestQuestions(withReply);
      setSuggestions(nuevas);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[90vh] max-h-[840px] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-grape shadow-neon-purple ring-1 ring-neon-purple/40">
      {/* Encabezado */}
      <header className="flex items-center gap-3 bg-gradient-to-r from-[#0a2c36] via-[#0f4753] to-[#0c3358] px-5 py-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-ink/50 ring-2 ring-[#35D6FF]/40">
          <GizmoMascot size={50} />
        </div>
        <div>
          <h1 className="text-[26px] font-extrabold leading-none text-white [text-shadow:0_0_10px_#35D6FF,0_0_22px_#36F0A8]">
            Gizmo
          </h1>
          <p className="text-sm font-semibold text-[#8af0e0] [text-shadow:0_0_8px_#35D6FF]">
            Trucos geniales con los precios
          </p>
        </div>
      </header>

      {/* Conversación */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-ink/60 px-4 py-5">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-end gap-2">
              <div className="shrink-0">
                <GizmoMascot size={34} />
              </div>
              <div className="max-w-[80%] whitespace-pre-line rounded-3xl rounded-bl-md border border-neon-cyan/40 bg-plum px-4 py-3 text-[15px] leading-relaxed text-cream shadow-neon-cyan">
                <Highlight text={m.content} />
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] whitespace-pre-line rounded-3xl rounded-br-md bg-gradient-to-br from-neon-pink to-neon-purple px-4 py-3 text-[15px] font-semibold text-white shadow-neon-pink">
                {m.content}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex items-end gap-2">
            <div className="shrink-0">
              <GizmoMascot size={34} />
            </div>
            <div className="flex gap-1 rounded-3xl rounded-bl-md border border-neon-cyan/40 bg-plum px-4 py-4 shadow-neon-cyan">
              <span className="dot" />
              <span className="dot [animation-delay:0.15s]" />
              <span className="dot [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>

      {/* Preguntas sugeridas por la IA (3, cambian según la conversación) */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 bg-grape px-4 pt-3">
        {suggestions.map((q, i) => (
          <button
            key={`${i}-${q}`}
            onClick={() => send(q)}
            disabled={loading}
            className="rounded-full border-2 border-neon-cyan/70 px-3 py-1.5 text-sm font-bold text-neon-cyan transition hover:bg-neon-cyan hover:text-ink hover:shadow-neon-cyan disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Entrada de texto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 bg-grape px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          className="flex-1 rounded-full bg-plum px-5 py-3 text-[15px] text-cream placeholder:text-cream/40 outline-none ring-2 ring-transparent transition focus:ring-neon-cyan"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Enviar"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-neon-pink transition hover:brightness-125 disabled:opacity-40"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 11l18-8-8 18-2-7-8-3z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  );
}
