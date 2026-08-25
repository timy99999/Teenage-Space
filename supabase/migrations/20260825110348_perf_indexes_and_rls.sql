-- Performance fixes flagged by Supabase Advisors (security/performance lints):
-- 1. Foreign keys without a covering index (favorites.event_id, ratings.event_id,
--    submissions.published_event_id, submissions.user_id) - degrades at scale.
-- 2. RLS policies calling auth.uid() directly get re-evaluated per row; wrapping
--    in (select auth.uid()) lets Postgres evaluate it once per query instead.
--
-- Safe to re-run: indexes use IF NOT EXISTS, policies are dropped and recreated.

create index if not exists favorites_event_id_idx on favorites (event_id);
create index if not exists ratings_event_id_idx on ratings (event_id);
create index if not exists submissions_published_event_id_idx on submissions (published_event_id);
create index if not exists submissions_user_id_idx on submissions (user_id);

drop policy if exists "profiles are readable by owner" on profiles;
create policy "profiles are readable by owner" on profiles
  for select using ((select auth.uid()) = id);
drop policy if exists "profiles are insertable by owner" on profiles;
create policy "profiles are insertable by owner" on profiles
  for insert with check ((select auth.uid()) = id);
drop policy if exists "profiles are updatable by owner" on profiles;
create policy "profiles are updatable by owner" on profiles
  for update using ((select auth.uid()) = id);

drop policy if exists "favorites are owner-only" on favorites;
create policy "favorites are owner-only" on favorites
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "ratings are owner-only" on ratings;
create policy "ratings are owner-only" on ratings
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "submissions are owner-only" on submissions;
create policy "submissions are owner-only" on submissions
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
