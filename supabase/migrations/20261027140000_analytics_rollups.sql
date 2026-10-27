-- Analytics upgrade, part 3: aggregates that outlive the raw events.
--
-- Raw traffic_events are kept 90 days. Everything the growth charts need beyond
-- that window has to be aggregated before the prune, which is what these tables
-- are for — they are kept forever and stay small (at ~400 daily actives,
-- traffic_user_daily grows by roughly 150k rows a year).
--
-- This also moves the nightly rollup out of the backend and into SQL. The JS
-- version read a day's raw rows through PostgREST with no pagination, and
-- Supabase caps that at 1000 rows by default — so any day busier than 1000
-- events was already being silently under-counted in traffic_daily_rollup.

create table if not exists traffic_feature_daily (
  day date not null,
  feature text not null references traffic_feature_catalog (feature),
  events int not null default 0,
  -- Distinct per day. Do NOT sum this across days to get period adoption; that
  -- double-counts anyone who came back. Use traffic_user_feature_monthly.
  users int not null default 0,
  sessions int not null default 0,
  primary key (day, feature)
);

alter table traffic_feature_daily enable row level security;

create table if not exists traffic_user_feature_monthly (
  month date not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  feature text not null references traffic_feature_catalog (feature),
  events int not null default 0,
  days_used int not null default 0,
  primary key (month, user_id, feature)
);

create index if not exists traffic_user_feature_monthly_user_idx
  on traffic_user_feature_monthly (user_id, month);

alter table traffic_user_feature_monthly enable row level security;

-- Deliberately nullable with no default, against this schema's usual
-- "not null default 0" style. Days before the upgrade genuinely were not
-- measured per person, and NULL says that; a 0 would read as "nobody was here"
-- and make the launch look like a crash on every chart.
alter table traffic_daily_rollup add column if not exists dau_users int;
alter table traffic_daily_rollup add column if not exists anon_visitors int;
alter table traffic_daily_rollup add column if not exists feature_events int;
alter table traffic_daily_rollup add column if not exists visits int;
alter table traffic_daily_rollup add column if not exists active_ms_total bigint;
alter table traffic_daily_rollup add column if not exists visit_ms_avg int;
alter table traffic_daily_rollup add column if not exists visit_ms_p50 int;
alter table traffic_daily_rollup add column if not exists visit_ms_p90 int;

-- Recomputes one Bishkek day from raw events, overwriting whatever was there.
-- Idempotent on purpose: the backend runs it on every boot as well as nightly,
-- and Render restarts often. The one thing it must never touch is
-- traffic_user_daily.active_ms / .visits — those are accumulated by
-- record_heartbeat() and recomputing them here would double-count time.
create or replace function public.rollup_traffic_day(p_day date)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_start timestamptz := (p_day::timestamp) at time zone 'Asia/Bishkek';
  v_end timestamptz := ((p_day + 1)::timestamp) at time zone 'Asia/Bishkek';
  v_month date := date_trunc('month', p_day::timestamp)::date;
  v_month_start timestamptz := (v_month::timestamp) at time zone 'Asia/Bishkek';
  v_month_end timestamptz := ((v_month + interval '1 month')::timestamp) at time zone 'Asia/Bishkek';

  -- The first day any per-user data exists. Before it, person-level columns are
  -- written as NULL rather than 0 (see the column comments above).
  v_identity_since date := (select min(day) from traffic_user_daily);
  v_measured boolean;

  v_page_views int;
  v_card_views int;
  v_link_clicks int;
  v_feature_events int;
  v_unique_sessions int;
  v_logged_in_sessions int;
  v_guest_sessions int;
  v_device_mobile int;
  v_device_tablet int;
  v_device_desktop int;
  v_dau_users int;
  v_anon_visitors int;

  v_visits int;
  v_visit_ms_avg int;
  v_visit_ms_p50 int;
  v_visit_ms_p90 int;
  v_active_ms_total bigint;
begin
  v_measured := v_identity_since is not null and p_day >= v_identity_since;

  -- Per-user counts. active_ms and visits are intentionally absent.
  insert into traffic_user_daily (day, user_id, page_views, card_views, link_clicks, feature_events)
  select p_day,
         user_id,
         count(*) filter (where event_type = 'page_view'),
         count(*) filter (where event_type = 'card_view'),
         count(*) filter (where event_type = 'link_click'),
         count(*) filter (where event_type = 'feature')
  from traffic_events
  where created_at >= v_start
    and created_at < v_end
    and user_id is not null
  group by user_id
  on conflict (day, user_id) do update set
    page_views = excluded.page_views,
    card_views = excluded.card_views,
    link_clicks = excluded.link_clicks,
    feature_events = excluded.feature_events;

  -- Delete-then-insert rather than upsert, so a feature that stopped happening
  -- doesn't leave a stale row behind on a recompute.
  delete from traffic_feature_daily where day = p_day;
  insert into traffic_feature_daily (day, feature, events, users, sessions)
  select p_day,
         feature,
         count(*),
         count(distinct user_id),
         count(distinct session_id)
  from traffic_events
  where created_at >= v_start
    and created_at < v_end
    and event_type = 'feature'
  group by feature;

  -- The whole month containing p_day is recomputed, which is what makes
  -- period-level adoption exact (a user active on ten days counts once). Safe
  -- because the cron only ever rolls up yesterday, so the month in question is
  -- always still inside the 90-day raw window.
  delete from traffic_user_feature_monthly where month = v_month;
  insert into traffic_user_feature_monthly (month, user_id, feature, events, days_used)
  select v_month,
         user_id,
         feature,
         count(*),
         count(distinct (created_at at time zone 'Asia/Bishkek')::date)
  from traffic_events
  where created_at >= v_month_start
    and created_at < v_month_end
    and event_type = 'feature'
    and user_id is not null
  group by user_id, feature;

  select count(*) filter (where event_type = 'page_view'),
         count(*) filter (where event_type = 'card_view'),
         count(*) filter (where event_type = 'link_click'),
         count(*) filter (where event_type = 'feature'),
         count(distinct session_id),
         count(distinct session_id) filter (where is_logged_in),
         count(distinct session_id) filter (where not is_logged_in),
         count(*) filter (where device_type = 'mobile'),
         count(*) filter (where device_type = 'tablet'),
         count(*) filter (where device_type = 'desktop'),
         count(distinct user_id),
         count(distinct session_id) filter (where user_id is null)
  into v_page_views, v_card_views, v_link_clicks, v_feature_events,
       v_unique_sessions, v_logged_in_sessions, v_guest_sessions,
       v_device_mobile, v_device_tablet, v_device_desktop,
       v_dau_users, v_anon_visitors
  from traffic_events
  where created_at >= v_start
    and created_at < v_end;

  -- Visit length distribution. Attributed to the day a visit started, unlike
  -- engaged time, which is credited per heartbeat to the day of that beat.
  select count(*),
         avg(active_ms)::int,
         percentile_cont(0.5) within group (order by active_ms)::int,
         percentile_cont(0.9) within group (order by active_ms)::int
  into v_visits, v_visit_ms_avg, v_visit_ms_p50, v_visit_ms_p90
  from traffic_visits
  where day = p_day;

  select sum(active_ms) into v_active_ms_total
  from traffic_user_daily
  where day = p_day;

  insert into traffic_daily_rollup (
    day, page_views, card_views, link_clicks, unique_sessions,
    logged_in_sessions, guest_sessions, device_mobile, device_tablet, device_desktop,
    dau_users, anon_visitors, feature_events, visits, active_ms_total,
    visit_ms_avg, visit_ms_p50, visit_ms_p90
  )
  values (
    p_day, v_page_views, v_card_views, v_link_clicks, v_unique_sessions,
    v_logged_in_sessions, v_guest_sessions, v_device_mobile, v_device_tablet, v_device_desktop,
    case when v_measured then v_dau_users end,
    case when v_measured then v_anon_visitors end,
    case when v_measured then v_feature_events end,
    case when v_visits > 0 then v_visits end,
    case when v_measured then coalesce(v_active_ms_total, 0) end,
    v_visit_ms_avg, v_visit_ms_p50, v_visit_ms_p90
  )
  on conflict (day) do update set
    page_views = excluded.page_views,
    card_views = excluded.card_views,
    link_clicks = excluded.link_clicks,
    unique_sessions = excluded.unique_sessions,
    logged_in_sessions = excluded.logged_in_sessions,
    guest_sessions = excluded.guest_sessions,
    device_mobile = excluded.device_mobile,
    device_tablet = excluded.device_tablet,
    device_desktop = excluded.device_desktop,
    dau_users = excluded.dau_users,
    anon_visitors = excluded.anon_visitors,
    feature_events = excluded.feature_events,
    visits = excluded.visits,
    active_ms_total = excluded.active_ms_total,
    visit_ms_avg = excluded.visit_ms_avg,
    visit_ms_p50 = excluded.visit_ms_p50,
    visit_ms_p90 = excluded.visit_ms_p90;
end;
$$;

revoke all on function public.rollup_traffic_day(date) from public, anon, authenticated;
grant execute on function public.rollup_traffic_day(date) to service_role;

-- One-off backfill, so the new day-level columns are consistent across the raw
-- events we still hold — and so the days the old 1000-row-capped rollup
-- under-counted get their real numbers. Stops at 29 days back: raw events were
-- pruned at 30 days until now, so day -30 is already partly gone and
-- recomputing it would report a number lower than what actually happened.
--
-- Per-person columns come out NULL for every day here, which is correct: there
-- was no user_id on those events to count people with.
do $$
declare
  v_offset int;
begin
  for v_offset in 1..29 loop
    perform public.rollup_traffic_day(
      ((now() at time zone 'Asia/Bishkek')::date - v_offset)
    );
  end loop;
end;
$$;
