create table traffic_events (
  id bigserial primary key,
  session_id uuid not null,
  event_type text not null check (event_type in ('page_view', 'card_view', 'link_click')),
  target_type text check (target_type in ('event', 'news')),
  target_id text,
  link_kind text check (link_kind in ('registration', 'instagram', 'telegram', 'extra_link', 'news_link')),
  path text,
  device_type text not null check (device_type in ('mobile', 'tablet', 'desktop')),
  is_logged_in boolean not null default false,
  created_at timestamptz not null default now()
);

create index traffic_events_created_at_idx on traffic_events (created_at);
create index traffic_events_type_created_idx on traffic_events (event_type, created_at);
create index traffic_events_card_view_target_idx
  on traffic_events (target_type, target_id) where event_type = 'card_view';
create index traffic_events_link_kind_idx
  on traffic_events (link_kind) where event_type = 'link_click';

alter table traffic_events enable row level security;

create table traffic_sessions (
  session_id uuid primary key,
  device_type text not null check (device_type in ('mobile', 'tablet', 'desktop')),
  is_logged_in boolean not null default false,
  last_seen_at timestamptz not null default now()
);

create index traffic_sessions_last_seen_idx on traffic_sessions (last_seen_at);

alter table traffic_sessions enable row level security;

create table traffic_daily_rollup (
  day date primary key,
  page_views int not null default 0,
  card_views int not null default 0,
  link_clicks int not null default 0,
  unique_sessions int not null default 0,
  logged_in_sessions int not null default 0,
  guest_sessions int not null default 0,
  device_mobile int not null default 0,
  device_tablet int not null default 0,
  device_desktop int not null default 0
);

alter table traffic_daily_rollup enable row level security;

-- Hourly breakdown for "today" (Asia/Bishkek), 24 rows, zero-filled.
create or replace function public.get_traffic_hourly_today()
returns table(hour int, views bigint)
language sql
security definer
set search_path = public
as $$
  select h.hour, coalesce(count(e.id), 0)::bigint
  from generate_series(0, 23) as h(hour)
  left join traffic_events e
    on extract(hour from (e.created_at at time zone 'Asia/Bishkek'))::int = h.hour
    and (e.created_at at time zone 'Asia/Bishkek')::date = (now() at time zone 'Asia/Bishkek')::date
    and e.event_type = 'page_view'
  group by h.hour
  order by h.hour;
$$;

revoke all on function public.get_traffic_hourly_today() from public, anon, authenticated;
grant execute on function public.get_traffic_hourly_today() to service_role;

-- Daily trend for the last p_days days (Asia/Bishkek calendar days), zero-filled.
-- Past days read from the rollup table; today is computed live from raw events.
create or replace function public.get_traffic_daily_trend(p_days int)
returns table(
  day date,
  page_views bigint,
  card_views bigint,
  link_clicks bigint,
  unique_sessions bigint
)
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
  today_live as (
    select
      (now() at time zone 'Asia/Bishkek')::date as day,
      count(*) filter (where event_type = 'page_view')::bigint as page_views,
      count(*) filter (where event_type = 'card_view')::bigint as card_views,
      count(*) filter (where event_type = 'link_click')::bigint as link_clicks,
      count(distinct session_id)::bigint as unique_sessions
    from traffic_events
    where (created_at at time zone 'Asia/Bishkek')::date = (now() at time zone 'Asia/Bishkek')::date
  )
  select
    d.day,
    coalesce(t.page_views, r.page_views, 0)::bigint,
    coalesce(t.card_views, r.card_views, 0)::bigint,
    coalesce(t.link_clicks, r.link_clicks, 0)::bigint,
    coalesce(t.unique_sessions, r.unique_sessions, 0)::bigint
  from days d
  left join traffic_daily_rollup r on r.day = d.day
  left join today_live t on t.day = d.day
  order by d.day;
$$;

revoke all on function public.get_traffic_daily_trend(int) from public, anon, authenticated;
grant execute on function public.get_traffic_daily_trend(int) to service_role;

-- Top viewed event/news cards over the last p_days days, resolved to a title.
create or replace function public.get_traffic_top_cards(p_days int, p_limit int)
returns table(target_type text, target_id text, title text, views bigint)
language sql
security definer
set search_path = public
as $$
  select
    e.target_type,
    e.target_id,
    coalesce(ev.title, nw.title, e.target_id) as title,
    count(*)::bigint as views
  from traffic_events e
  left join events ev on e.target_type = 'event' and ev.id = e.target_id
  left join news nw on e.target_type = 'news' and nw.id = e.target_id
  where e.event_type = 'card_view'
    and e.target_type is not null
    and e.target_id is not null
    and e.created_at >= now() - (p_days || ' days')::interval
  group by e.target_type, e.target_id, ev.title, nw.title
  order by views desc
  limit p_limit;
$$;

revoke all on function public.get_traffic_top_cards(int, int) from public, anon, authenticated;
grant execute on function public.get_traffic_top_cards(int, int) to service_role;

-- Distinct-session device breakdown over the last p_days days.
create or replace function public.get_traffic_device_breakdown(p_days int)
returns table(device_type text, sessions bigint)
language sql
security definer
set search_path = public
as $$
  select device_type, count(distinct session_id)::bigint as sessions
  from traffic_events
  where created_at >= now() - (p_days || ' days')::interval
  group by device_type
  order by sessions desc;
$$;

revoke all on function public.get_traffic_device_breakdown(int) from public, anon, authenticated;
grant execute on function public.get_traffic_device_breakdown(int) to service_role;

-- Distinct-session guest/logged-in split over the last p_days days.
create or replace function public.get_traffic_login_split(p_days int)
returns table(is_logged_in boolean, sessions bigint)
language sql
security definer
set search_path = public
as $$
  select is_logged_in, count(distinct session_id)::bigint as sessions
  from traffic_events
  where created_at >= now() - (p_days || ' days')::interval
  group by is_logged_in;
$$;

revoke all on function public.get_traffic_login_split(int) from public, anon, authenticated;
grant execute on function public.get_traffic_login_split(int) to service_role;

-- Top clicked link kinds over the last p_days days.
create or replace function public.get_traffic_top_links(p_days int)
returns table(link_kind text, clicks bigint)
language sql
security definer
set search_path = public
as $$
  select link_kind, count(*)::bigint as clicks
  from traffic_events
  where event_type = 'link_click'
    and link_kind is not null
    and created_at >= now() - (p_days || ' days')::interval
  group by link_kind
  order by clicks desc;
$$;

revoke all on function public.get_traffic_top_links(int) from public, anon, authenticated;
grant execute on function public.get_traffic_top_links(int) to service_role;
