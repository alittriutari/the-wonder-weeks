# Wonder Weeks Tracker

A personal web app to track your baby's developmental leaps, based on the Wonder Weeks methodology by Van de Rijt & Plooij.

## ⚠️ Important note

Wonder Weeks leaps are a **developmental framework** — a rough schedule of cognitive growth windows. They are **not** a precise predictor of baby behavior. Every baby develops at their own pace.

All leap timing is calculated from your baby's **Estimated Due Date (EDD)**, not their actual birth date, as recommended by the Wonder Weeks methodology.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On first launch, enter your baby's EDD. All 10 leaps are then calculated dynamically — nothing is hardcoded.

---

## Tech stack

- **Next.js 14** (App Router, static export)
- **TypeScript** (strict mode)
- **Tailwind CSS** (dark mode via class strategy)
- **date-fns** for all date arithmetic
- **No backend** — all state in `localStorage`

---

## Deploying to Vercel

```bash
npm run build
```

This produces a static export in `out/`. Deploy directly to Vercel — no server required.

---

## Running tests

```bash
npm test
```

Tests cover:
- `age-calculator` — age from EDD, validation
- `leap-calculator` — leap status resolution, active/next detection
- `notification-service` — schedule building, due detection, merge logic

---

## Architecture

```
src/
├── app/          # Next.js App Router pages + layout
├── components/   # UI components (onboarding, dashboard, leaps, timeline, notifications, settings)
├── data/         # Raw leap definitions (pure data, no logic)
├── lib/          # Pure calculation + service modules
├── hooks/        # React state + localStorage wiring
└── types/        # Shared TypeScript interfaces
```

### Extensibility notes

| Future feature | How to add it |
|---|---|
| Multiple babies | `useEDD(babyId)` already accepts an ID; add a baby selector UI + map keyed storage |
| Export | `exportStorageSnapshot()` in `storage.ts` — pipe to JSON/CSV |
| Cloud sync | Swap `storage.ts` internals for an API client; hooks unchanged |
| Push notifications (server) | Replace `deliverBrowserNotification` with a service worker + push subscription |

---

## Leap data source

Leap windows are taken from *The Wonder Weeks* (Van de Rijt & Plooij). Start/end weeks represent the published developmental windows from EDD, with minor rounding for day-level precision. See `src/data/leap-data.ts`.
