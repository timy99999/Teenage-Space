-- Analytics upgrade, part 4: the read side.
--
-- All of these are additive — none of the six existing traffic RPCs change
-- shape, so the Посещаемость tab keeps working untouched while the new Рост tab
-- is built on top.
--
-- Two conventions throughout:
--   * Day bucketing is Asia/Bishkek, matching the rest of the schema, and
--     windows are expressed as timestamptz bounds rather than a cast on
--     created_at, so the index on created_at is usable.
--   * Person-level numbers come back NULL, not 0, for days before any per-user
--     data existed. There was no user_id on those events to count people with,
--     and a 0 would read as a collapse rather than as "not measured".

-- DAU / WAU / MAU ------------------------------------------------------------
-- Source is traffic_user_daily, which heartbeats write live, so today's numbers
-- are current rather than waiting for the nightly rollup.
--
-- DAU counts people, so anonymous visitors are deliberately absent; they are
-- reported separately as anon_visitors in traffic_daily_rollup.
create or replace function public.get_traffic_active_users(p_days int)
returns table(day date, dau int, wau int, mau int, stickiness numeric)
language sql
security definer
set search_path = public
as $$
  with days as (
    select generate_series(
      (now() at time zone 'Asia/Bishkek')::date - (p_days - 1),
      (now() at time zone 'Asia/Bishkek')::date,
      '1 day'
    )::date as day
  ),
  epoch as (select min(day) as since from traffic_user_daily),
  calc as (
    select
      d.day,
      (select count(distinct u.user_id)::int from traffic_user_daily u where u.day = d.day) as dau,
      (select count(distinct u.user_id)::int from traffic_user_daily u
        where u.day > d.day - 7 and u.day <= d.day) as wau,
      (select count(distinct u.user_id)::int from traffic_user_daily u
        where u.day > d.day - 28 and u.day <= d.day) as mau,
      (e.since is not null and d.day >= e.since) as measured
    from days d cross join epoch e
  )
  select
    day,
    case when measured then dau end,
    case when measured then wau end,
    case when measured then mau end,
    case when measured and mau > 0 then round(dau::numeric / mau, 3) end
  from calc
  order by day;
$$;

revoke all on function public.get_traffic_active_users(int) from public, anon, authenticated;
grant execute on function public.get_traffic_active_users(int) to service_role;

-- Visit length ---------------------------------------------------------------
-- Read straight from traffic_visits, which is exact for the whole 90-day window
-- the dashboard offers. Days with no visits come back with NULL percentiles so
-- the chart draws a gap instead of a misleading zero.
create or replace function public.get_traffic_session_stats(p_days int)
returns table(day date, visits int, users int, ms_avg int, ms_p50 int, ms_p90 int)
language sql
security definer
set search_path = public
as $$
  with days as (
    select generate_series(
      (now() at time zone 'Asia/Bishkek')::date - (p_days - 1),
      (now() at time zone 'Asia/Bishkek')::date,
      '1 day'
    )::date as day
  )
  select
    d.day,
    count(v.id)::int,
    count(distinct v.user_id)::int,
    avg(v.active_ms)::int,
    percentile_cont(0.5) within group (order by v.active_ms)::int,
    percentile_cont(0.9) within group (order by v.active_ms)::int
  from days d
  left join traffic_visits v on v.day = d.day
  group by d.day
  order by d.day;
$$;

revoke all on function public.get_traffic_session_stats(int) from public, anon, authenticated;
grant execute on function public.get_traffic_session_stats(int) to service_role;

-- Feature adoption -----------------------------------------------------------
-- Driven off the catalog rather than off the events, so a feature nobody touched
-- shows up as a zero instead of vanishing from the list — "nobody uses this" is
-- the actionable finding. prev_users is the same count over the preceding window
-- of equal length, for the trend arrow.
create or replace function public.get_traffic_feature_adoption(p_days int)
returns table(
  feature text,
  feature_group text,
  label text,
  events bigint,
  users bigint,
  adoption_pct numeric,
  prev_users bigint
)
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select
      (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as cur_start,
      (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1) - p_days)::timestamp) at time zone 'Asia/Bishkek' as prev_start,
      ((now() at time zone 'Asia/Bishkek')::date - (p_days - 1)) as cur_start_day
  ),
  cur as (
    select e.feature, count(*) as events, count(distinct e.user_id) as users
    from traffic_events e, bounds b
    where e.event_type = 'feature' and e.created_at >= b.cur_start
    group by e.feature
  ),
  prev as (
    select e.feature, count(distinct e.user_id) as users
    from traffic_events e, bounds b
    where e.event_type = 'feature'
      and e.created_at >= b.prev_start
      and e.created_at < b.cur_start
    group by e.feature
  ),
  active as (
    select count(distinct u.user_id) as n
    from traffic_user_daily u, bounds b
    where u.day >= b.cur_start_day
  )
  select
    c.feature,
    c.feature_group,
    c.label,
    coalesce(cur.events, 0),
    coalesce(cur.users, 0),
    case when active.n > 0 then round(100.0 * coalesce(cur.users, 0) / active.n, 1) end,
    coalesce(prev.users, 0)
  from traffic_feature_catalog c
  left join cur on cur.feature = c.feature
  left join prev on prev.feature = c.feature
  cross join active
  where c.active
  order by c.sort_order;
$$;

revoke all on function public.get_traffic_feature_adoption(int) from public, anon, authenticated;
grant execute on function public.get_traffic_feature_adoption(int) to service_role;

-- Retention ------------------------------------------------------------------
-- Cohort = the week someone registered. Retained at Dn = any activity at all in
-- the window (signup, signup+n], rather than exactly on day n, which is far too
-- jumpy at this scale.
--
-- Each percentage is computed only over members whose window has actually
-- elapsed, so a cohort from three days ago reports D1 and leaves D7/D30 null
-- instead of pretending everyone churned.
create or replace function public.get_traffic_retention(p_cohort_weeks int)
returns table(cohort_week date, cohort_size int, d1 int, d7 int, d30 int)
language sql
security definer
set search_path = public
as $$
  with today as (select (now() at time zone 'Asia/Bishkek')::date as d),
  weeks as (
    select generate_series(
      date_trunc('week', (select d from today) - (p_cohort_weeks * 7 - 1)),
      date_trunc('week', (select d from today)),
      '1 week'
    )::date as cohort_week
  ),
  members as (
    select
      date_trunc('week', (p.created_at at time zone 'Asia/Bishkek')::date)::date as cohort_week,
      p.id as user_id,
      (p.created_at at time zone 'Asia/Bishkek')::date as signup_day
    from profiles p
  ),
  flagged as (
    select
      m.*,
      exists (
        select 1 from traffic_user_daily u
        where u.user_id = m.user_id and u.day > m.signup_day and u.day <= m.signup_day + 1
      ) as r1,
      exists (
        select 1 from traffic_user_daily u
        where u.user_id = m.user_id and u.day > m.signup_day and u.day <= m.signup_day + 7
      ) as r7,
      exists (
        select 1 from traffic_user_daily u
        where u.user_id = m.user_id and u.day > m.signup_day and u.day <= m.signup_day + 30
      ) as r30
    from members m
  )
  select
    w.cohort_week,
    count(f.user_id)::int,
    (round(
      100.0 * count(*) filter (where f.r1 and f.signup_day + 1 <= (select d from today))
      / nullif(count(*) filter (where f.signup_day + 1 <= (select d from today)), 0)
    ))::int,
    (round(
      100.0 * count(*) filter (where f.r7 and f.signup_day + 7 <= (select d from today))
      / nullif(count(*) filter (where f.signup_day + 7 <= (select d from today)), 0)
    ))::int,
    (round(
      100.0 * count(*) filter (where f.r30 and f.signup_day + 30 <= (select d from today))
      / nullif(count(*) filter (where f.signup_day + 30 <= (select d from today)), 0)
    ))::int
  from weeks w
  left join flagged f on f.cohort_week = w.cohort_week
  group by w.cohort_week
  order by w.cohort_week;
$$;

revoke all on function public.get_traffic_retention(int) from public, anon, authenticated;
grant execute on function public.get_traffic_retention(int) to service_role;

-- Most active people ---------------------------------------------------------
create or replace function public.get_traffic_top_users(p_days int, p_limit int)
returns table(
  user_id uuid,
  username text,
  name text,
  active_ms bigint,
  visits int,
  days_active int,
  features_used int,
  last_seen date
)
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select
      ((now() at time zone 'Asia/Bishkek')::date - (p_days - 1)) as start_day,
      (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as start_ts
  )
  select
    u.user_id,
    p.username,
    p.name,
    sum(u.active_ms),
    sum(u.visits)::int,
    count(*)::int,
    (
      select count(distinct e.feature)::int
      from traffic_events e, bounds b2
      where e.user_id = u.user_id and e.event_type = 'feature' and e.created_at >= b2.start_ts
    ),
    max(u.day)
  from traffic_user_daily u
  join profiles p on p.id = u.user_id
  cross join bounds b
  where u.day >= b.start_day
  group by u.user_id, p.username, p.name
  order by sum(u.active_ms) desc, count(*) desc
  limit p_limit;
$$;

revoke all on function public.get_traffic_top_users(int, int) from public, anon, authenticated;
grant execute on function public.get_traffic_top_users(int, int) to service_role;

-- One person's activity profile ----------------------------------------------
-- Returned as jsonb so the whole drilldown (totals, a daily series for the
-- sparkline, and the feature list) is one round trip from the user's page.
create or replace function public.get_traffic_user_profile(p_user_id uuid, p_days int)
returns jsonb
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select
      ((now() at time zone 'Asia/Bishkek')::date - (p_days - 1)) as start_day,
      (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as start_ts
  ),
  days as (
    select generate_series(
      (select start_day from bounds),
      (now() at time zone 'Asia/Bishkek')::date,
      '1 day'
    )::date as day
  )
  select jsonb_build_object(
    'totals', (
      -- Lifetime, not windowed: "how much time has this person spent here" is
      -- the question, and traffic_user_daily keeps every day forever.
      select jsonb_build_object(
        'activeMs', coalesce(sum(active_ms), 0),
        'visits', coalesce(sum(visits), 0),
        'daysActive', count(*),
        'pageViews', coalesce(sum(page_views), 0),
        'cardViews', coalesce(sum(card_views), 0),
        'linkClicks', coalesce(sum(link_clicks), 0),
        'firstSeen', min(day),
        'lastSeen', max(day)
      )
      from traffic_user_daily where user_id = p_user_id
    ),
    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'day', d.day,
        'activeMs', coalesce(u.active_ms, 0),
        'events', coalesce(u.page_views + u.card_views + u.link_clicks + u.feature_events, 0)
      ) order by d.day), '[]'::jsonb)
      from days d
      left join traffic_user_daily u on u.day = d.day and u.user_id = p_user_id
    ),
    'features', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'feature', f.feature,
        'label', c.label,
        'group', c.feature_group,
        'uses', f.uses,
        'lastUsed', f.last_used
      ) order by f.uses desc), '[]'::jsonb)
      from (
        select e.feature, count(*) as uses, max((e.created_at at time zone 'Asia/Bishkek')::date) as last_used
        from traffic_events e, bounds b
        where e.user_id = p_user_id and e.event_type = 'feature' and e.created_at >= b.start_ts
        group by e.feature
      ) f
      join traffic_feature_catalog c on c.feature = f.feature
    )
  );
$$;

revoke all on function public.get_traffic_user_profile(uuid, int) from public, anon, authenticated;
grant execute on function public.get_traffic_user_profile(uuid, int) to service_role;

-- What people search for -----------------------------------------------------
-- zero_results is the interesting half: those searches have always rendered an
-- empty grid, and nothing recorded which words produced it.
create or replace function public.get_traffic_search_insights(p_days int)
returns table(query text, searches bigint, zero_results bigint)
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as start_ts
  )
  select
    lower(e.detail),
    count(*),
    count(*) filter (where e.feature = 'search_zero_result')
  from traffic_events e, bounds b
  where e.event_type = 'feature'
    and e.feature in ('search_query', 'search_zero_result')
    and e.detail is not null
    and e.created_at >= b.start_ts
  group by lower(e.detail)
  order by count(*) desc
  limit 20;
$$;

revoke all on function public.get_traffic_search_insights(int) from public, anon, authenticated;
grant execute on function public.get_traffic_search_insights(int) to service_role;

-- Which parts of the site get used -------------------------------------------
create or replace function public.get_traffic_top_pages(p_days int)
returns table(path text, views bigint, visitors bigint)
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as start_ts
  )
  select e.path, count(*), count(distinct e.session_id)
  from traffic_events e, bounds b
  where e.event_type = 'page_view'
    and e.path is not null
    and e.created_at >= b.start_ts
  group by e.path
  order by count(*) desc
  limit 20;
$$;

revoke all on function public.get_traffic_top_pages(int) from public, anon, authenticated;
grant execute on function public.get_traffic_top_pages(int) to service_role;

-- The signup funnel ----------------------------------------------------------
-- Counted by session, not by user: at the top of this funnel nobody has an
-- account yet. Ordered by the catalog's sort_order, which is the step order.
create or replace function public.get_traffic_signup_funnel(p_days int)
returns table(feature text, label text, sessions bigint)
language sql
security definer
set search_path = public
as $$
  with bounds as (
    select (((now() at time zone 'Asia/Bishkek')::date - (p_days - 1))::timestamp) at time zone 'Asia/Bishkek' as start_ts
  )
  select c.feature, c.label, count(distinct e.session_id)
  from traffic_feature_catalog c
  left join traffic_events e
    on e.feature = c.feature
   and e.event_type = 'feature'
   and e.created_at >= (select start_ts from bounds)
  where c.feature_group = 'signup' and c.active
  group by c.feature, c.label, c.sort_order
  order by c.sort_order;
$$;

revoke all on function public.get_traffic_signup_funnel(int) from public, anon, authenticated;
grant execute on function public.get_traffic_signup_funnel(int) to service_role;
