# StudioSpace

A studio marketplace frontend: browse, filter, and book creative spaces (photo studios, sound stages, podcast rooms, music suites, art workshops) by the hour.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components, React Compiler)
- **TypeScript** + **Tailwind CSS 4** (no `tailwind.config` — tokens in `src/app/globals.css`)
- **shadcn/ui** in `base-nova` style — primitives are **Base UI** (`@base-ui/react`), not Radix
- **Better Auth** (email/password + Google) — session gating via `authClient.useSession()`
- **Sonner** toasts (`<Toaster />` mounted in `src/app/layout.tsx`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The frontend expects the StudioSpace API on **http://localhost:8000** (override with `NEXT_PUBLIC_API_URL`). Start the backend separately (`studiospace-server` → `npm run dev`); without it, pages show honest error/empty states instead of fake data.

## Commands

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                      |
| `npm run build`     | Production build (also typechecks)          |
| `npm run lint`      | ESLint 9 flat config                        |
| `npx tsc --noEmit`  | Typecheck only                              |

No test runner is configured.

## Routes

| Route                    | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| `/`                      | Home: hero slider, featured studios, categories, how it works, about |
| `/studios`               | Explore: search, category/location/price filters, sort, pagination (`?category=` deep links) |
| `/studios/[id]`          | Studio detail + booking dialog (creates a Pending booking) |
| `/studios/edit/[id]`     | Edit a listing you host                             |
| `/add-studio`            | Publish a new studio                                |
| `/my-listings`           | Manage your studios (edit/delete)                   |
| `/my-bookings`           | Your bookings (cancel pending ones)                 |
| `/dashboard`             | Account overview with real listing/booking counts   |
| `/login`, `/register`    | Better Auth email/password + Google                 |
| `/profile`, `/about`, `/how-it-works`, `/privacy`, `/terms` | Static pages        |

## API

All data flows through `src/lib/studios-api.ts` (`NEXT_PUBLIC_API_URL`, default `http://localhost:8000`):

- `GET /api/studios` — search/category/location/price/sort/pagination
- `GET /api/studios/:id`
- `POST /api/studios`, `PUT /api/studios/:id`, `DELETE /api/studios/:id`
- `POST /api/bookings`, `GET /api/bookings/my-bookings?email=`, `PATCH /api/bookings/:id/cancel`

Host/user identity is passed as `hostEmail`/`userEmail` fields (the backend has no auth on these routes).
