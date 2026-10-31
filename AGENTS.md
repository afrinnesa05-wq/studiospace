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
- `README.md` is stock create-next-app and wrong about paths (says `app/page.tsx`; the real entry is `src/app/page.tsx`).
