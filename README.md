# Orient marketing site

Astro hybrid site (static marketing pages + server routes for waitlist and internal docs).

## Local development

```bash
cp .env.example .env
# Fill SITE_PASSWORD, Supabase keys, optional PUBLIC_GA_MEASUREMENT_ID

npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Environment variables (Vercel)

| Variable | Required | Purpose |
|----------|----------|---------|
| `SITE_PASSWORD` | For private pages | Protects `/pricing` and `/strategy` |
| `SESSION_SECRET` | Recommended | Signs session cookie (defaults to `SITE_PASSWORD`) |
| `SUPABASE_URL` | For waitlist | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | For waitlist | Server-side inserts only |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 |

## Supabase waitlist

Run the migration in `supabase/migrations/20250603120000_waitlist_signups.sql` in the Supabase SQL editor (or via CLI).

## Private pages

- `/pricing` and `/strategy` require sign-in at `/login` (shared password).
- `/login` is public; session lasts 30 days.

## Legacy HTML

Original static files are in `legacy/` for reference. Live pages live in `src/pages/`.
