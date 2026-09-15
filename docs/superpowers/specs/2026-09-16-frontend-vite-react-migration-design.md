# Frontend migration: Next.js → Vite + React + TypeScript

## Purpose

Replace the Next.js frontend with a plain React + TypeScript app built on
Vite. Same directory (`frontend/`), same pages, same visual design, same
`npm run dev/build/lint/format/format:check` script names so the root
`Makefile` needs no changes. No new product behavior — a framework port.

## Scope

In scope: the 3 existing routes (`/`, `/login`, `/signup`), their shared
components (`NavBar`, `AuthCard`, `Button`, `FormField`), the auth/session
logic (`lib/auth.ts`, `useAuthState.ts`), the config file
(`config/main.config.ts`), the dark "tactical" Tailwind theme in
`globals.css`, and the dev-time `/api` proxy to the Django backend.

Out of scope: any new pages, any backend changes, any visual redesign.

## Tooling

- **Vite** + `@vitejs/plugin-react`, TypeScript.
- **react-router-dom** for routing: a root layout route renders `NavBar`
  plus an `<Outlet>`, matching the current `layout.tsx` wrapping
  `page.tsx`.
- **Tailwind v4** via the `@tailwindcss/vite` plugin (Tailwind's own Vite
  integration) instead of the current PostCSS pipeline.
- **ESLint 9 + typescript-eslint + eslint-plugin-react-hooks +
  eslint-plugin-react-refresh**, replacing `eslint-config-next` (which is
  Next-specific). **Prettier** stays as-is.
- Path alias `@/` → `src/` preserved via `tsconfig` + Vite `resolve.alias`,
  so import statements in ported files need no rewriting beyond the
  router-specific changes below.

## Component/file inventory and how each ports

| Current (Next) | New (Vite) | Change |
|---|---|---|
| `lib/auth.ts` | same | none — already framework-agnostic (`fetch` + `localStorage` + events) |
| `hooks/useAuthState.ts` | same | none |
| `config/main.config.ts` | same | none |
| `components/Button.tsx` | same | none |
| `components/auth/AuthCard.tsx` | same | none |
| `components/auth/FormField.tsx` | same | none |
| `components/NavBar.tsx` | same | `next/link` `<Link href>` → react-router `<Link to>`; `useRouter().push()` → `useNavigate()` |
| `app/login/page.tsx` | `pages/LoginPage.tsx` | same router substitution as NavBar |
| `app/signup/page.tsx` | `pages/SignupPage.tsx` | same router substitution |
| `app/page.tsx` | `pages/HomePage.tsx` | same router substitution |
| `app/layout.tsx` | `layouts/RootLayout.tsx` | becomes a react-router layout route (`<Outlet>` instead of `children` prop); sets `document.title` from `APP_CENTRAL_NAME` via effect instead of Next `metadata` export |
| `app/globals.css` | `index.css` | unchanged content, just relocated; `@theme` tokens and fonts/Material Symbols `<link>` move into `index.html` |
| `next/font/google` (Inter, JetBrains Mono) | Google Fonts `<link>` tags in `index.html` | same fonts/weights, different loading mechanism (no Next-specific font optimizer available outside Next) |
| `next.config.ts` rewrites | `vite.config.ts` `server.proxy` | same `/api/*` → `BACKEND_ORIGIN` (default `http://localhost:8000`) behavior |

## Data flow / auth behavior

Unchanged: `login()`/`signup()` in `lib/auth.ts` POST to `/api/auth/...`
(proxied to Django in dev), store JWT access/refresh tokens in
`localStorage`, and `useAuthState()` (via `useSyncExternalStore`) reacts to
token changes to drive `NavBar` and the home page. None of this logic
changes — only the URL-routing wrapper around it does.

## Error handling

No new error paths. Existing inline form error display (`role="alert"`
paragraph under each form) carries over unchanged.

## Testing

- `make check` (ESLint + Prettier, both frontend and backend) must pass.
- Dev server (`npm run dev`) started and all 3 routes (`/`, `/login`,
  `/signup`) hit for a 200 response.
- Headless-browser screenshot of each route to confirm no visual
  regression from the current dark "tactical" theme (icon centering,
  squared buttons, fonts, colors all preserved).

## Removal approach

`git rm -r frontend/` (keeps full history recoverable) rather than a raw
`rm -rf`, then scaffold the new project in the same path.
