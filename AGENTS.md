<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single Next.js 16.4.3 App Router app (not a monorepo). Source lives in `src/`: routes in `src/app/`, shadcn components in `src/components/ui/`, helpers in `src/lib/`. Path alias `@/*` → `src/*`.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build; also runs the TypeScript check
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`); bare `eslint`, lints the whole working directory
- `npx tsc --noEmit` — typecheck only (there is no `typecheck` script)
- No test runner is configured — don't look for `npm test`

Verify changes with `npm run lint` && `npx tsc --noEmit` (or just `npm run build`, which typechecks).

## Next.js 16 specifics

- Version-matched docs are bundled at `node_modules/next/dist/docs/` — read the relevant guide before writing Next code (see managed block above).
- `cacheComponents: true` + `partialPrefetching: true` in `next.config.ts`: caching follows the Cache Components model (`'use cache'` directive, `cacheLife`), not the older `fetch` cache-options model. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
- React Compiler is enabled (`reactCompiler: true`, `babel-plugin-react-compiler`): components must be pure — no render-time mutations or side effects.

## UI stack (non-default shadcn setup)

- shadcn style `base-nova` (`components.json`): primitives are **Base UI** (`@base-ui/react`), not Radix — never import `@radix-ui/react-*`.
- Add components with the shadcn CLI (it's a dependency): `npx shadcn add <component>`.
- `cn` comes from the `cn` npm package; generated components import `import { cn } from "cn"` directly (`src/lib/utils.ts` only re-exports it).
- Tailwind CSS 4: no `tailwind.config` — theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables); CSS compiles via the `@tailwindcss/turbopack` loader rule in `next.config.ts`.

## Gotchas

- The block between the `BEGIN/END:nextjs-agent-rules` markers above is rewritten by `next dev` — keep the markers, don't edit inside them.
- `usePathname`/URL data in client components must sit inside `<Suspense>` when a route has dynamic params without `generateStaticParams` (e.g. navbar links, see `src/components/navbar.tsx`) — otherwise `next build` fails under Cache Components.
- React Compiler lint (`react-hooks`): no sync `setState` in effect bodies (async callbacks/timers/event handlers are fine); no `const Icon = fn()` then `<Icon/>` — use direct JSX or member expressions.

## Assignment conventions (StudioSpace)

- Brand palette: Deep Navy `#0B1F3A`, White `#FFFFFF`, Blue `#3B82F6`. Keep new UI on these; layouts must stay responsive (`sm/md/lg` breakpoints are the existing pattern).
- Notifications: **Sonner only** — `toast` from `sonner`; `<Toaster />` is mounted in `src/app/layout.tsx`. Never `alert()`, never Lorem Ipsum.
- Login/Register pages exist at `/login` and `/register` and are wired to Better Auth (`authClient.signIn/signUp.email`, Google via `authClient.signIn.social`); only password reset is a demo toast ("isn't connected yet"). Navbar gates on `authClient.useSession()` (skeleton while pending, authed dropdown with sign-out).
- Logo: assets live at `public/logo.png` (light bg) and `public/logo-on-dark.png` (navy bg); `src/components/logo.tsx` renders them via `next/image` with `variant="on-light" | "on-dark"`. Never move, rename, or regenerate the assets — swap the `<Image>` only if the files change.
- Routes: `/`, `/studios` (+ `?category=` deep links), `/studios/[id]`, `/studios/edit/[id]`, `/add-studio`, `/my-listings`, `/my-bookings`, `/dashboard`, `/login`, `/register`, `/profile`, `/about`, `/how-it-works`, `/privacy`, `/terms`. Home section anchors (`#featured-studios`, `#categories`, `#how-it-works`, `#about`) still exist for in-page links.
- **API layer**: `src/lib/studios-api.ts` — all fetches go through it, base URL `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`, backend = `..\studiospace-server`). Never hardcode URLs elsewhere. Backend has **no auth** — identity is `hostEmail`/`userEmail` body fields. Known backend issues (report, don't fix): CORS `Allow-Methods` lacks `PATCH` (cancel-booking blocked in browser); Atlas IP whitelist TLS error (alert 80) → 500s when the user's IP isn't in Atlas Network Access.
- Legal pages `/privacy` and `/terms` are content-only: they pass a `sections` array into the shared `src/components/legal-page.tsx` (navy hero + sticky "On this page" TOC + closing contact card). Bump the `updated` date when editing either page's copy.
- Avatar/studio photos are user-supplied URLs of unknown hosts, so they stay as `<img>` with an `eslint-disable-next-line @next/next/no-img-element` comment (see `src/app/studios/[id]/page.tsx`) — do not switch them to `next/image` without adding `images.remotePatterns`.
- Assignment rules: App Router + TypeScript only; no Vite/React SPA, no alternative frameworks, no unnecessary new libraries. **Do not modify the backend repo or its `.env`/JWT/Better Auth server config.**
