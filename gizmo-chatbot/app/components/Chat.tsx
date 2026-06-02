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
            <span key={i} className="font-extrabold text-gizmo-coral">
              {part}
            </span>
          );
        }
        if (low === "cobertura" || low === "coberturas") {
          return (
            <span key={i} className="font-extrabold text-gizmo-deep">
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
    <div className="flex h-[88vh] max-h-[760px] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-black/5">
      {/* Encabezado */}
      <header className="flex items-center gap-3 bg-gizmo-deep px-5 py-4 text-white">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15">
          <GizmoMascot size={50} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold leading-none">Gizmo</h1>
          <p className="text-sm text-white/80">Trucos geniales con los precios</p>
        </div>
      </header>

      {/* Conversación */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-cream px-4 py-5">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-end gap-2">
              <div className="shrink-0">
                <GizmoMascot size={34} />
              </div>
              <div className="max-w-[80%] whitespace-pre-line rounded-3xl rounded-bl-md border-2 border-gizmo-mint/40 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-700 shadow-sm">
                <Highlight text={m.content} />
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] whitespace-pre-line rounded-3xl rounded-br-md bg-gizmo-coral px-4 py-3 text-[15px] font-semibold text-white shadow-sm">
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
            <div className="flex gap-1 rounded-3xl rounded-bl-md border-2 border-gizmo-mint/40 bg-white px-4 py-4 shadow-sm">
              <span className="dot" />
              <span className="dot [animation-delay:0.15s]" />
              <span className="dot [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>

      {/* Preguntas recomendadas */}
      <div className="flex flex-wrap gap-2 border-t border-black/5 bg-white px-4 pt-3">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            disabled={loading}
            className="rounded-full border-2 border-gizmo-coral/60 px-3 py-1.5 text-sm font-bold text-gizmo-coral transition hover:bg-gizmo-coral hover:text-white disabled:opacity-40"
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
        className="flex items-center gap-2 bg-white px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          className="flex-1 rounded-full bg-cream px-5 py-3 text-[15px] text-slate-700 outline-none ring-2 ring-transparent transition focus:ring-gizmo-mint"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Enviar"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gizmo-coral text-white transition hover:brightness-110 disabled:opacity-40"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 11l18-8-8 18-2-7-8-3z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  );
}
