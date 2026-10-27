-- The digest's daily block is column-oriented: days[] and every metric array are
-- read positionally against each other. Two of them were sourced straight from
-- traffic_daily_rollup, which has no row for today until the nightly cron writes
-- one — so visitors[] and pageViews[] came back one element short and every
-- value lined up against the wrong date. Silent, and exactly the kind of error
-- that survives into a conclusion.
--
-- Both now come from get_traffic_daily_trend(), which is zero-filled across the
-- whole range and computes today live, matching the generate_series windows the
-- other series already use. anonVisitors keeps its rollup source but is left
-- joined onto the full day range, so it is null for today rather than missing —
-- which the caveats already explain how to read.

create or replace function public.get_analytics_digest(p_days int)
returns jsonb
language sql
security definer
set search_path = public
as $$
  with today as (select (now() at time zone 'Asia/Bishkek')::date as d),
  daily_days as (select least(p_days, 30) as n),
  au as (select * from get_traffic_active_users((select n from daily_days))),
  ss as (select * from get_traffic_session_stats((select n from daily_days))),
  dt as (select * from get_traffic_daily_trend((select n from daily_days))),
  anon as (
    select d.day, r.anon_visitors
    from (
      select generate_series(
        (select d from today) - ((select n from daily_days) - 1),
        (select d from today),
        '1 day'
      )::date as day
    ) d
    left join traffic_daily_rollup r on r.day = d.day
  ),
  monthly as (
    select
      date_trunc('month', u.day)::date as month,
      count(distinct u.user_id) as users,
      sum(u.visits) as visits,
      round(sum(u.active_ms) / 3600000.0, 1) as active_hours
    from traffic_user_daily u
    where u.day >= (date_trunc('month', (select d from today)) - interval '11 months')::date
    group by 1
  ),
  weekly as (
    select
      date_trunc('week', u.day)::date as week,
      count(distinct u.user_id) as users,
      sum(u.visits) as visits
    from traffic_user_daily u
    where u.day >= (select d from today) - 83
    group by 1
  )
  select jsonb_build_object(
    'meta', jsonb_build_object(
      'generatedAt', now(),
      'timezone', 'Asia/Bishkek',
      'windowDays', p_days,
      'from', (select d from today) - (p_days - 1),
      'to', (select d from today),
      'identitySince', (select min(day) from traffic_user_daily),
      'caveats', jsonb_build_array(
        'dau/wau/mau count signed-in people only; guests appear as anonVisitors',
        'null in a series means not measured, not zero',
        'every array in daily/weekly/monthly is positional against its days/weeks/months array',
        'engaged time is heartbeat-derived (25s cadence, visible tab only), so it under-reads reading time',
        'raw events are kept 90 days; per-day and per-feature aggregates are kept indefinitely'
      )
    ),
    'totals', jsonb_build_object(
      'registered', (select count(*) from profiles),
      'activeLast7', (select count(distinct user_id) from traffic_user_daily where day > (select d from today) - 7),
      'activeLast28', (select count(distinct user_id) from traffic_user_daily where day > (select d from today) - 28),
      'newLast7', (select count(*) from profiles where (created_at at time zone 'Asia/Bishkek')::date > (select d from today) - 7),
      'newLast28', (select count(*) from profiles where (created_at at time zone 'Asia/Bishkek')::date > (select d from today) - 28),
      'activeHoursLast28', (
        select round(coalesce(sum(active_ms), 0) / 3600000.0, 1)
        from traffic_user_daily where day > (select d from today) - 28
      )
    ),
    'daily', jsonb_build_object(
      'days', (select jsonb_agg(day order by day) from au),
      'dau', (select jsonb_agg(dau order by day) from au),
      'wau', (select jsonb_agg(wau order by day) from au),
      'mau', (select jsonb_agg(mau order by day) from au),
      'visitors', (select jsonb_agg(unique_sessions order by day) from dt),
      'anonVisitors', (select jsonb_agg(anon_visitors order by day) from anon),
      'pageViews', (select jsonb_agg(page_views order by day) from dt),
      'visits', (select jsonb_agg(visits order by day) from ss),
      'visitMsP50', (select jsonb_agg(ms_p50 order by day) from ss),
      'visitMsAvg', (select jsonb_agg(ms_avg order by day) from ss)
    ),
    'weekly', jsonb_build_object(
      'weeks', (select jsonb_agg(week order by week) from weekly),
      'activeUsers', (select jsonb_agg(users order by week) from weekly),
      'visits', (select jsonb_agg(visits order by week) from weekly)
    ),
    'monthly', jsonb_build_object(
      'months', (select jsonb_agg(month order by month) from monthly),
      'activeUsers', (select jsonb_agg(users order by month) from monthly),
      'visits', (select jsonb_agg(visits order by month) from monthly),
      'activeHours', (select jsonb_agg(active_hours order by month) from monthly)
    ),
    'features', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'key', feature, 'group', feature_group, 'label', label,
        'events', events, 'users', users, 'pct', adoption_pct, 'prevUsers', prev_users
      )), '[]'::jsonb)
      from get_traffic_feature_adoption(p_days)
    ),
    'retention', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'week', cohort_week, 'size', cohort_size, 'd1', d1, 'd7', d7, 'd30', d30
      ) order by cohort_week), '[]'::jsonb)
      from get_traffic_retention(8)
    ),
    'signupFunnel', (
      select coalesce(jsonb_agg(jsonb_build_object('step', label, 'sessions', sessions)), '[]'::jsonb)
      from get_traffic_signup_funnel(p_days)
    ),
    'top', jsonb_build_object(
      'cards', (
        select coalesce(jsonb_agg(jsonb_build_object('title', title, 'views', views)), '[]'::jsonb)
        from get_traffic_top_cards(p_days, 10)
      ),
      'pages', (
        select coalesce(jsonb_agg(jsonb_build_object('path', path, 'views', views, 'visitors', visitors)), '[]'::jsonb)
        from (select * from get_traffic_top_pages(p_days) limit 10) p
      ),
      'searches', (
        select coalesce(jsonb_agg(jsonb_build_object('q', query, 'n', searches, 'zero', zero_results)), '[]'::jsonb)
        from (select * from get_traffic_search_insights(p_days) limit 10) s
      ),
      'links', (
        select coalesce(jsonb_agg(jsonb_build_object('kind', link_kind, 'clicks', clicks)), '[]'::jsonb)
        from get_traffic_top_links(p_days)
      ),
      'devices', (
        select coalesce(jsonb_agg(jsonb_build_object('device', device_type, 'sessions', sessions)), '[]'::jsonb)
        from get_traffic_device_breakdown(p_days)
      )
    ),
    'topUsers', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'username', username,
        'activeMin', round(active_ms / 60000.0),
        'visits', visits,
        'daysActive', days_active,
        'featuresUsed', features_used,
        'lastSeen', last_seen
      )), '[]'::jsonb)
      from get_traffic_top_users(p_days, 20)
    )
  );
$$;

revoke all on function public.get_analytics_digest(int) from public, anon, authenticated;
grant execute on function public.get_analytics_digest(int) to service_role;
