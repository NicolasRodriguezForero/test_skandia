"use client";

import { useEffect, useRef, useState } from "react";
import { askGizmo, type ChatMessage } from "../actions";
import { SUGGESTED_QUESTIONS, WELCOME_MESSAGE } from "../lib/prompt";
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
            <span key={i} className="font-extrabold text-neon-pink">
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
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[88vh] max-h-[760px] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-grape shadow-neon-purple ring-1 ring-neon-purple/40">
      {/* Encabezado */}
      <header className="flex items-center gap-3 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple px-5 py-4 text-white">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-ink/40 ring-2 ring-white/30">
          <GizmoMascot size={50} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold leading-none drop-shadow">Gizmo</h1>
          <p className="text-sm text-white/90">Trucos geniales con los precios</p>
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

      {/* Preguntas recomendadas */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 bg-grape px-4 pt-3">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
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
