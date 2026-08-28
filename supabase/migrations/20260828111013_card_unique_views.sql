-- Persistent, deduped per (card, session) so unique-view counts never decay when
-- traffic_events gets pruned by the nightly retention cron (see traffic-cleanup.service.ts).
-- One row per session that has ever viewed a given card, so plain count(*) below is
-- already an exact unique-visitor count, not just a total-events count.
create table traffic_card_views (
  target_type text not null check (target_type in ('event', 'news')),
  target_id text not null,
  session_id uuid not null,
  first_viewed_at timestamptz not null default now(),
  primary key (target_type, target_id, session_id)
);

alter table traffic_card_views enable row level security;

create or replace function public.get_card_unique_views()
returns table(target_type text, target_id text, unique_views bigint)
language sql
security definer
set search_path = public
as $$
  select target_type, target_id, count(*)::bigint as unique_views
  from traffic_card_views
  group by target_type, target_id;
$$;

revoke all on function public.get_card_unique_views() from public, anon, authenticated;
grant execute on function public.get_card_unique_views() to service_role;
