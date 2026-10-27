-- Analytics upgrade, part 1: who did it, and for how long.
--
-- Until now the only identity in traffic_events was session_id — a UUID in the
-- visitor's localStorage. One person on two devices counted as two "visitors",
-- and clearing storage minted a third. user_id fixes that; it is derived
-- server-side from the bearer token the frontend already sends on every
-- /api/traffic/* call (see OptionalAuthGuard), never from the request body,
-- because that controller is public and a body-sent id would let any visitor
-- forge another person's activity profile.
--
-- Time on site comes from the 25s heartbeat, which the frontend only sends
-- while the tab is actually visible (useHeartbeat.ts). So what we measure is
-- *engaged* time, not wall-clock time with an idle tab left open.
--
-- Vocabulary this migration introduces, because the old naming conflated them:
--   session_id = a VISITOR (immortal localStorage id)
--   visit      = one stretch of continuous activity; a gap > 30 min starts a new one

-- 1. Identity -----------------------------------------------------------------

alter table traffic_events add column if not exists user_id uuid references auth.users (id) on delete set null;
alter table traffic_sessions add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists traffic_events_user_created_idx
  on traffic_events (user_id, created_at) where user_id is not null;

-- 2. Visit accumulators on the visitor row ------------------------------------

alter table traffic_sessions add column if not exists first_seen_at timestamptz not null default now();
alter table traffic_sessions add column if not exists visit_started_at timestamptz not null default now();
alter table traffic_sessions add column if not exists visit_active_ms bigint not null default 0;
alter table traffic_sessions add column if not exists visit_heartbeats int not null default 0;

-- 3. Completed visits ---------------------------------------------------------
-- Attributed to the Bishkek day the visit STARTED. Per-day engaged time is not
-- read from here (a visit can straddle midnight) — that lives in
-- traffic_user_daily, credited per heartbeat. This table exists for the
-- distribution: average and percentile visit length.

create table if not exists traffic_visits (
  id bigserial primary key,
  session_id uuid not null,
  user_id uuid references auth.users (id) on delete set null,
  day date not null,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  active_ms bigint not null,
  heartbeats int not null,
  device_type text not null
);

create index if not exists traffic_visits_day_idx on traffic_visits (day);
create index if not exists traffic_visits_user_idx on traffic_visits (user_id, day) where user_id is not null;

alter table traffic_visits enable row level security;

-- 4. Per-user daily aggregate --------------------------------------------------
-- Kept forever: this is what survives the 90-day pruning of raw events, and
-- what makes DAU/WAU/MAU and "how long has this person spent here" answerable
-- over the site's whole lifetime. Only signed-in users get a row; anonymous
-- activity is counted at day level in traffic_daily_rollup.
--
-- active_ms and visits are owned by record_heartbeat() and must never be
-- written by the nightly rollup — that cron reruns on every backend restart,
-- so a rollup that touched them would double-count time.

create table if not exists traffic_user_daily (
  day date not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  active_ms bigint not null default 0,
  visits int not null default 0,
  page_views int not null default 0,
  card_views int not null default 0,
  link_clicks int not null default 0,
  feature_events int not null default 0,
  primary key (day, user_id)
);

create index if not exists traffic_user_daily_user_idx on traffic_user_daily (user_id, day);

alter table traffic_user_daily enable row level security;

-- 5. Heartbeat ingestion -------------------------------------------------------
-- Replaces the plain upsert the backend used to do. That upsert wrote a full
-- row every 25s, which would reset the accumulators above to their defaults on
-- every beat — engaged time would silently stay zero.
--
-- Credit rule: the elapsed time since the previous beat counts only if it is at
-- most 60s (25s cadence plus one dropped beat of jitter). A hidden tab sends
-- nothing at all, so its gap blows past 60s and contributes zero — idle time is
-- structurally uncountable here, which is the point. A visit of N consecutive
-- beats therefore measures (N-1) x 25s, and a visit shorter than one interval
-- measures 0.

create or replace function public.record_heartbeat(
  p_session_id uuid,
  p_device_type text,
  p_user_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_prev timestamptz;
  v_gap interval;
  v_credit bigint := 0;
  v_new_visit boolean := false;
  v_day date := (now() at time zone 'Asia/Bishkek')::date;
begin
  select last_seen_at into v_prev
  from traffic_sessions
  where session_id = p_session_id
  for update;

  if v_prev is not null then
    v_gap := now() - v_prev;
    if v_gap <= interval '60 seconds' then
      v_credit := (extract(epoch from v_gap) * 1000)::bigint;
    elsif v_gap > interval '30 minutes' then
      v_new_visit := true;
      insert into traffic_visits (
        session_id, user_id, day, started_at, ended_at, active_ms, heartbeats, device_type
      )
      select session_id,
             user_id,
             (visit_started_at at time zone 'Asia/Bishkek')::date,
             visit_started_at,
             last_seen_at,
             visit_active_ms,
             visit_heartbeats,
             device_type
      from traffic_sessions
      where session_id = p_session_id
        and visit_heartbeats > 0;
    end if;
  end if;

  insert into traffic_sessions (
    session_id, user_id, device_type, is_logged_in, last_seen_at,
    first_seen_at, visit_started_at, visit_active_ms, visit_heartbeats
  )
  values (
    p_session_id, p_user_id, p_device_type, p_user_id is not null, now(),
    now(), now(), 0, 1
  )
  on conflict (session_id) do update set
    -- A fresh visit re-establishes identity from the current token, so a shared
    -- device (school computer) doesn't keep attributing visits to whoever logged
    -- in last. Within one visit the known identity is kept, so a mid-visit
    -- logout doesn't orphan the rest of it.
    user_id = case
                when v_new_visit then p_user_id
                else coalesce(p_user_id, traffic_sessions.user_id)
              end,
    device_type = p_device_type,
    is_logged_in = p_user_id is not null,
    last_seen_at = now(),
    visit_started_at = case when v_new_visit then now() else traffic_sessions.visit_started_at end,
    visit_active_ms = case when v_new_visit then 0 else traffic_sessions.visit_active_ms + v_credit end,
    visit_heartbeats = case when v_new_visit then 1 else traffic_sessions.visit_heartbeats + 1 end;

  if p_user_id is not null then
    insert into traffic_user_daily (day, user_id, active_ms, visits)
    values (v_day, p_user_id, v_credit, case when v_new_visit or v_prev is null then 1 else 0 end)
    on conflict (day, user_id) do update set
      active_ms = traffic_user_daily.active_ms + excluded.active_ms,
      visits = traffic_user_daily.visits + excluded.visits;
  end if;
end;
$$;

revoke all on function public.record_heartbeat(uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.record_heartbeat(uuid, text, uuid) to service_role;

-- 6. Flush visits that simply ended --------------------------------------------
-- A visit is only closed by the *next* beat arriving late. Someone who closes
-- the tab and never comes back would leave their last visit sitting open in
-- traffic_sessions forever, missing from the duration stats. The nightly cron
-- calls this first.

create or replace function public.flush_stale_visits()
returns void
language sql
security definer
set search_path = public
as $$
  with stale as (
    select session_id, user_id, visit_started_at, last_seen_at,
           visit_active_ms, visit_heartbeats, device_type
    from traffic_sessions
    where visit_heartbeats > 0
      and last_seen_at < now() - interval '30 minutes'
  ),
  moved as (
    insert into traffic_visits (
      session_id, user_id, day, started_at, ended_at, active_ms, heartbeats, device_type
    )
    select session_id,
           user_id,
           (visit_started_at at time zone 'Asia/Bishkek')::date,
           visit_started_at,
           last_seen_at,
           visit_active_ms,
           visit_heartbeats,
           device_type
    from stale
    returning session_id
  )
  update traffic_sessions s
  set visit_heartbeats = 0,
      visit_active_ms = 0
  from moved m
  where s.session_id = m.session_id;
$$;

revoke all on function public.flush_stale_visits() from public, anon, authenticated;
grant execute on function public.flush_stale_visits() to service_role;
