# frontend

React + TypeScript + Vite. Not Next.js — the app was moved off Next during
the initial build-out, so no `next/*` imports, App Router conventions, or
`pages/`/`app/` directories.

## Styling

Tailwind CSS v4, wired in through `@tailwindcss/vite` in `vite.config.ts`.
There's no `tailwind.config.js` — v4 configures itself from `src/index.css`.

## UI components

shadcn/ui is the base component layer, built on Radix UI primitives (the
`radix-ui` package). Check shadcn/ui and Radix UI before writing a component
from scratch — see `skills/code-quality` at the repo root for the rule.

The path alias `@/*` resolves to `src/*` (`tsconfig.app.json`,
`vite.config.ts`); shadcn components import through it.

## Editor

The block editor is built on Tiptap (`@tiptap/react`, `@tiptap/pm`,
`@tiptap/starter-kit`).
