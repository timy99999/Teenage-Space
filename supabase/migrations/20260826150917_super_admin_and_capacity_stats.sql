alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check check (role in ('user', 'admin', 'super_admin'));

update profiles set role = 'super_admin' where id = '195ec6d2-1a6a-4da9-bf45-f6829e960524';

create or replace function public.get_database_size()
returns bigint
language sql
security definer
set search_path = public
as $$
  select pg_database_size(current_database());
$$;

revoke all on function public.get_database_size() from public, anon, authenticated;
grant execute on function public.get_database_size() to service_role;

create or replace function public.get_storage_stats()
returns table(bucket_id text, file_count bigint, total_bytes bigint)
language sql
security definer
set search_path = public
as $$
  select o.bucket_id, count(*)::bigint, coalesce(sum((o.metadata->>'size')::bigint), 0)::bigint
  from storage.objects o
  group by o.bucket_id;
$$;

revoke all on function public.get_storage_stats() from public, anon, authenticated;
grant execute on function public.get_storage_stats() to service_role;
