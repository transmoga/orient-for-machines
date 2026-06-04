-- Waitlist signups for orient.site
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'unknown',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

-- No public policies: inserts only via service role on the server.
