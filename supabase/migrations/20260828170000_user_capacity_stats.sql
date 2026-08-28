-- Live "how many users can we still take" numbers for the super-admin Analytics
-- page. One cheap row: registered/banned counts, the on-disk footprint of the
-- user-owned tables, who is online right now, and today's busiest hour as a
-- rough concurrency proxy. security definer + service_role only, same as the
-- other capacity/traffic stat functions.
create or replace function public.get_user_capacity_stats()
returns table(
  registered_total bigint,
  banned_total bigint,
  user_data_bytes bigint,
  online_now bigint,
  peak_concurrent_today bigint
)
language sql
security definer
set search_path = public
as $$
  select
    (select count(*) from auth.users)::bigint,
    (select count(*) from public.profiles where is_banned)::bigint,
    (
      pg_total_relation_size('public.profiles')
      + pg_total_relation_size('public.favorites')
      + pg_total_relation_size('public.ratings')
      + pg_total_relation_size('public.submissions')
    )::bigint,
    (
      select count(*) from public.traffic_sessions
      where last_seen_at >= now() - interval '90 seconds'
    )::bigint,
    coalesce((
      select max(bucket_sessions)
      from (
        select count(distinct session_id) as bucket_sessions
        from public.traffic_events
        where (created_at at time zone 'Asia/Bishkek')::date
              = (now() at time zone 'Asia/Bishkek')::date
        group by date_trunc('hour', created_at at time zone 'Asia/Bishkek')
      ) hourly
    ), 0)::bigint;
$$;

revoke all on function public.get_user_capacity_stats() from public, anon, authenticated;
grant execute on function public.get_user_capacity_stats() to service_role;
