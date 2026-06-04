# Orient marketing site — Astro migration guide

This document describes how to reproduce **scripts, lead capture, newsletter, and Vercel deployment** from the legacy Next.js app (`demo/`) in the new **Astro** site.

> **Implementation status (this repo):** The marketing comms below are implemented. See the
> "How this repo implements the guide" section at the bottom for the concrete file mapping and
> the decisions made where this repo differs from the guide's assumptions.

**Reference implementation (Next.js):**

| Concern | File |
|--------|------|
| Global scripts + footer newsletter | `demo/src/app/layout.tsx` |
| Resend server logic | `demo/src/app/actions.ts` |
| Newsletter UI + messages | `demo/src/components/newsletter-form-client.tsx` |
| Request access (HubSpot) | `demo/src/app/request-access/page.tsx` |
| Book a demo (HubSpot Meetings) | `demo/src/app/book-a-demo/page.tsx` |

**Production site metadata (Next):** `metadataBase: https://orientos.ai` in `demo/src/app/layout.tsx`.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Every page — SiteScripts.astro (in <head>)                     │
│  • HubSpot tracking (portal 148266494)                          │
│  • LinkedIn Insight (partner 10041305)                          │
│  • Apollo website tracker                                       │
│  • img/video contextmenu block                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  /request-access                                                │
│  HubSpot embedded form → CRM (NOT Resend)                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  /book-a-demo                                                   │
│  HubSpot Meetings embed → calendar mikael16                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Footer newsletter (Newsletter.astro)                          │
│  Browser → POST /api/subscribe (Astro API route) → Resend       │
└─────────────────────────────────────────────────────────────────┘
```

**Important:** `requestAccess` in `actions.ts` (Resend + welcome email) is **not wired** on the live Next site. `/request-access` uses **HubSpot only**. Do not duplicate that Resend flow unless product explicitly asks.

---

## Constants (do not change without marketing ops)

| Integration | Value |
|-------------|--------|
| HubSpot portal ID | `148266494` |
| HubSpot region | `eu1` |
| Request access form ID | `5506452a-7f85-4ab0-bd50-1c0748d62baa` |
| HubSpot tracking script | `//js-eu1.hs-scripts.com/148266494.js` |
| HubSpot forms embed | `https://js-eu1.hsforms.net/forms/embed/v2.js` |
| Meetings embed URL | `https://meetings-eu1.hubspot.com/mikael16?embed=true` |
| Meetings embed script | `https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js` |
| LinkedIn partner ID | `10041305` |
| Apollo app ID | `69ce5ceb4088ba0021763ecd` |

---

## Environment variables (Vercel)

Set in the Astro project (Production + Preview). **Never** prefix Resend keys with `PUBLIC_`.

| Variable | Required | Used for |
|----------|----------|----------|
| `RESEND_API_KEY` | Footer newsletter | Resend API |
| `RESEND_AUDIENCE_ID` | Footer newsletter | Resend audience for contacts |
| `CUSTOMER_DEMO_PASSWORD` | Optional | Only if porting `/customers/demo` (Next-only today) |

HubSpot IDs are hardcoded in `SiteScripts.astro` and the page embeds (same as Next).

**Resend production note:** Verify your domain in Resend before go-live if you later add a welcome email.

---

## How this repo implements the guide

This repo is the Supabase-backed waitlist Astro site (not the Next `demo/`). Key differences and decisions:

| Guide assumption | This repo | Decision |
|------------------|-----------|----------|
| `output: 'hybrid'` required for API routes | `output: 'static'` + per-route `export const prerender = false` | **Kept `static`.** Astro server routes already work this way here (see `/api/waitlist`). No config change needed. |
| Global scripts in `BaseLayout.astro` | No shared layout; pages are full HTML docs | Created `src/components/SiteScripts.astro`, imported into each public page's `<head>`. |
| Footer newsletter is the primary capture | Site already has a Supabase **waitlist** as primary capture | Newsletter added **alongside** the waitlist (distinct purpose), not replacing it. |
| Trackers load on every page | — | Trackers are gated to `import.meta.env.PROD`, so local `astro dev` does not load HubSpot/LinkedIn/Apollo. Builds (incl. Vercel preview) do. The contextmenu guard always runs. |
| Trackers on internal pages | `pricing`, `strategy` are `noindex` internal drafts; `login` is an auth gate | `SiteScripts` / `Newsletter` added to public marketing pages + `/request-access` + `/book-a-demo` only. |

### File mapping (this repo)

| Concern | File |
|--------|------|
| Global tracking scripts + contextmenu guard | `src/components/SiteScripts.astro` |
| Footer newsletter UI + client handler | `src/components/Newsletter.astro` |
| Newsletter server route (Resend) | `src/pages/api/subscribe.ts` |
| Request access (HubSpot form) | `src/pages/request-access.astro` |
| Book a demo (HubSpot Meetings) | `src/pages/book-a-demo.astro` |
| Pages wired with SiteScripts + Newsletter | `index`, `about`, `forhumans`, `formachines`, `usecases`, `request-access`, `book-a-demo` |

---

## Pre-launch verification checklist

- [ ] **HubSpot tracking:** Production build — Network shows `148266494.js` on homepage.
- [ ] **Request access:** `/request-access` renders the HubSpot form; test submission appears in HubSpot contacts.
- [ ] **Book a demo:** `/book-a-demo` Meetings iframe loads; test booking flow.
- [ ] **Newsletter:** `POST /api/subscribe` returns success; contact appears in Resend audience.
- [ ] **Newsletter (misconfig):** Without env vars, message is *Email signup is not configured yet.*
- [ ] **LinkedIn / Apollo:** Scripts load on a production/preview build without console errors.
- [ ] **Env secrets:** Not exposed in client bundle (`import.meta.env.RESEND_*` only in `src/pages/api/subscribe.ts`).
- [ ] **Waitlist:** Existing Supabase waitlist (`/api/waitlist`) still works.

---

## Vercel deployment

1. **Settings → Git** → connect this Astro repository.
2. **Root Directory:** repo root (`.`).
3. **Framework Preset:** Astro.
4. **Build Command:** `npm run build`.
5. **Environment variables:** add `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` (server-only) plus the existing `SUPABASE_*`, `SITE_PASSWORD`, `SESSION_SECRET`.
6. **Domains:** keep `orientos.ai` / `www`.

---

*Last synced from `orient-website` Next demo. Update this doc when HubSpot form IDs, meeting links, or tracking IDs change.*
