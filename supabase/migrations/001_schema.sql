-- ============================================================
-- Vault OS — Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor).
-- DO NOT run automatically. Review before applying.
-- ============================================================

-- ── profiles ────────────────────────────────────────────────
-- One row per authenticated user, keyed to auth.users(id).
-- Created automatically via the trigger below.

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  full_name   text,
  avatar_url  text,
  currency    text default 'USD',
  locale      text default 'en-US',
  theme       text default 'system'
);

-- ── transactions ─────────────────────────────────────────────
-- All income and expense entries, scoped to a user.

create table if not exists public.transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  type        text not null check (type in ('income', 'expense')),
  amount      numeric(12, 2) not null check (amount > 0),
  category    text not null,
  note        text,
  date        date not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Index for fast per-user queries ──────────────────────────
create index if not exists transactions_user_id_idx
  on public.transactions(user_id);

create index if not exists transactions_date_idx
  on public.transactions(user_id, date desc);

-- ── Auto-update updated_at ────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger transactions_updated_at
  before update on public.transactions
  for each row execute procedure public.set_updated_at();

-- ── Auto-create profile on signup ─────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
