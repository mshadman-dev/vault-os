-- ============================================================
-- Vault OS — Row Level Security Policies
-- ============================================================
-- Run AFTER 001_schema.sql.
-- DO NOT run automatically. Review before applying.
-- ============================================================

-- ── Enable RLS ────────────────────────────────────────────────

alter table public.profiles    enable row level security;
alter table public.transactions enable row level security;

-- ── profiles policies ────────────────────────────────────────
-- Each user can only see and modify their own profile row.

create policy "profiles: select own row"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: insert own row"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: update own row"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles: delete own row"
  on public.profiles for delete
  using (auth.uid() = id);

-- ── transactions policies ─────────────────────────────────────
-- Each user can only see and modify their own transactions.

create policy "transactions: select own rows"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "transactions: insert own rows"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "transactions: update own rows"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "transactions: delete own rows"
  on public.transactions for delete
  using (auth.uid() = user_id);
