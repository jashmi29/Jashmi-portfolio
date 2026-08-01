


-- ============================================================
-- Recruiter Analytics: recruiter_interactions table
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.recruiter_interactions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  company text,
  role text,
  interaction_type text not null check (
    interaction_type in (
      'contact_form',
      'view_resume_uiux',
      'view_resume_fullstack',
      'email_resume_uiux',
      'email_resume_fullstack'
    )
  ),
  resume_type text check (resume_type in ('uiux', 'fullstack')),
  ip_address text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

-- Indexes for fast filtering/grouping in a future dashboard
create index if not exists idx_interactions_type on public.recruiter_interactions (interaction_type);
create index if not exists idx_interactions_created_at on public.recruiter_interactions (created_at desc);
create index if not exists idx_interactions_email on public.recruiter_interactions (email);
create index if not exists idx_interactions_resume_type on public.recruiter_interactions (resume_type);

-- ============================================================
-- Row Level Security
-- ============================================================
-- The service-role key (used server-side in /lib/supabase-server.ts)
-- bypasses RLS entirely — it is NEVER exposed to the client.
-- The anon/public key cannot read or write rows.
-- ============================================================

alter table public.recruiter_interactions enable row level security;

-- No policies = everything denied for anon/key roles.
-- The API only ever talks to Supabase through the service-role client,
-- which is immune to RLS.
-- ============================================================
-- (Optional) If you later build a dashboard with Supabase Auth,
-- add a policy like this so only the authenticated owner can read:
--
-- create policy "Owner can read interactions"
--   on public.recruiter_interactions
--   for select
--   to authenticated
--   using (auth.uid() = supabase.auth.uid());
-- ============================================================

