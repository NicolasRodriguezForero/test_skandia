# Gizmo Chatbot 🪄

Plataforma educativa que le explica a **niños** qué es un *forward* y por qué sirve de
*cobertura*, usando metáforas de intercambios entre amigos (cartas, figuritas, videojuegos).

Construido como una aplicación profesional lista para desplegar.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **IA vía OpenRouter**, llamada únicamente desde un **Server Action** (sin API routes)
- Mascota **Gizmo**: SVG original animado (no usa personajes con derechos de autor)

## Arquitectura (importante)

- Todo el "backend" es **una sola Server Action**: `app/actions.ts → askGizmo()`.
  Recibe la conversación, llama a OpenRouter y devuelve el texto. La **clave de API
  nunca llega al navegador**.
- La interfaz (`app/components/Chat.tsx`) es un componente cliente que invoca esa
  Server Action directamente.
- El contenido pedagógico (personalidad, reglas y preguntas) vive en `app/lib/prompt.ts`.

## Puesta en marcha local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear el archivo de entorno a partir del ejemplo y poner tu clave:
   ```bash
   cp .env.local.example .env.local
   # edita .env.local y pega tu OPENROUTER_API_KEY (https://openrouter.ai/keys)
   ```
3. Arrancar en desarrollo:
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000

## Despliegue (Vercel)

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: **New Project** → importa el repo.
3. En **Settings → Environment Variables** agrega:
   - `OPENROUTER_API_KEY` (obligatoria)
   - `OPENROUTER_MODEL` (opcional, por defecto `openai/gpt-4o-mini`)
   - `OPENROUTER_SITE_URL` y `OPENROUTER_SITE_NAME` (opcionales)
4. Deploy. Vercel detecta Next.js automáticamente.

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `OPENROUTER_API_KEY` | Sí | Clave de OpenRouter |
| `OPENROUTER_MODEL` | No | Modelo (por defecto `openai/gpt-4o-mini`) |
| `OPENROUTER_SITE_URL` | No | URL pública del despliegue |
| `OPENROUTER_SITE_NAME` | No | Nombre para el ranking de OpenRouter |

## Estructura

```
gizmo-chatbot/
├── app/
│   ├── actions.ts            # Server Action (único backend): llama a OpenRouter
│   ├── layout.tsx            # Layout + metadata (título "Gizmo", favicon)
│   ├── page.tsx              # Página principal
│   ├── globals.css           # Estilos + animaciones
│   ├── lib/prompt.ts         # Personalidad, reglas y preguntas recomendadas
│   └── components/
│       ├── Chat.tsx          # Interfaz de chat (cliente)
│       └── GizmoMascot.tsx   # Mascota SVG animada (diseño original)
├── .env.local.example
└── package.json
```
