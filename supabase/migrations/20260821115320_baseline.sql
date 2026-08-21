-- Baseline migration for Teenage Space.
--
-- This reconciles the database to the shape described in supabase/schema.sql,
-- regardless of what already exists: `create table if not exists` covers a
-- brand new project, and the `alter table ... add column if not exists`
-- blocks below cover a project that was set up before some columns existed
-- (this repo historically edited schema.sql in place without a matching
-- migration, so production could lag behind what the code expects — see the
-- "Ошибка 500 при публикации" incident from 2026-08-21, caused by
-- submissions.event_time / event_date_end missing on the live database).
--
-- Everything here is safe to re-run: table/column creation is guarded with
-- IF NOT EXISTS, and storage policies are dropped and recreated by name.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  name text not null default '',
  last_name text not null default '',
  birth_date date,
  email text,
  avatar_url text,
  theme text not null default 'light' check (theme in ('light', 'dark')),
  notif_opt_in boolean not null default false,
  name_changed_at timestamptz,
  username_changed_at timestamptz,
  policy_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  role text not null default 'user' check (role in ('user', 'admin')),
  is_banned boolean not null default false
);

alter table profiles add column if not exists name text not null default '';
alter table profiles add column if not exists last_name text not null default '';
alter table profiles add column if not exists birth_date date;
alter table profiles add column if not exists email text;
alter table profiles add column if not exists avatar_url text;
alter table profiles add column if not exists theme text not null default 'light' check (theme in ('light', 'dark'));
alter table profiles add column if not exists notif_opt_in boolean not null default false;
alter table profiles add column if not exists name_changed_at timestamptz;
alter table profiles add column if not exists username_changed_at timestamptz;
alter table profiles add column if not exists policy_accepted_at timestamptz;
alter table profiles add column if not exists created_at timestamptz not null default now();
alter table profiles add column if not exists role text not null default 'user' check (role in ('user', 'admin'));
alter table profiles add column if not exists is_banned boolean not null default false;

alter table profiles enable row level security;

drop policy if exists "profiles are readable by owner" on profiles;
create policy "profiles are readable by owner" on profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles are insertable by owner" on profiles;
create policy "profiles are insertable by owner" on profiles
  for insert with check (auth.uid() = id);
drop policy if exists "profiles are updatable by owner" on profiles;
create policy "profiles are updatable by owner" on profiles
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
create table if not exists events (
  id text primary key,
  title text not null,
  category text not null,
  themes text[] not null default '{}',
  age_min int not null check (age_min between 0 and 99),
  age_max int not null check (age_max between 0 and 99),
  age_label text not null,
  price text not null check (price in ('free', 'paid')),
  cost text,
  charity boolean not null default false,
  level text not null check (level in ('local', 'intl')),
  format text not null,
  event_date date,
  event_date_end date,
  event_time text,
  deadline_date date,
  place text not null,
  audience text,
  short_desc text not null,
  description text not null,
  instagram text,
  registration_url text,
  extra_link_title text,
  extra_link_url text,
  telegram text,
  is_past boolean not null default false,
  archived boolean not null default false,
  image_url text,
  created_at timestamptz not null default now()
);

alter table events add column if not exists title text not null;
alter table events add column if not exists category text not null;
alter table events add column if not exists themes text[] not null default '{}';
alter table events add column if not exists age_label text not null;
alter table events add column if not exists cost text;
alter table events add column if not exists charity boolean not null default false;
alter table events add column if not exists format text not null;
alter table events add column if not exists event_date date;
alter table events add column if not exists event_date_end date;
alter table events add column if not exists event_time text;
alter table events add column if not exists deadline_date date;
alter table events add column if not exists place text not null;
alter table events add column if not exists audience text;
alter table events add column if not exists short_desc text not null;
alter table events add column if not exists description text not null;
alter table events add column if not exists instagram text;
alter table events add column if not exists registration_url text;
alter table events add column if not exists extra_link_title text;
alter table events add column if not exists extra_link_url text;
alter table events add column if not exists telegram text;
alter table events add column if not exists is_past boolean not null default false;
alter table events add column if not exists archived boolean not null default false;
alter table events add column if not exists image_url text;
alter table events add column if not exists created_at timestamptz not null default now();

alter table events enable row level security;
drop policy if exists "events are public" on events;
create policy "events are public" on events for select using (true);

-- ---------------------------------------------------------------------------
-- news
-- ---------------------------------------------------------------------------
create table if not exists news (
  id text primary key,
  title text not null,
  event_date date not null,
  short_desc text not null,
  image_url text,
  link_title text,
  link_url text
);

alter table news add column if not exists title text not null;
alter table news add column if not exists event_date date not null;
alter table news add column if not exists short_desc text not null;
alter table news add column if not exists image_url text;
alter table news add column if not exists link_title text;
alter table news add column if not exists link_url text;

alter table news enable row level security;
drop policy if exists "news is public" on news;
create policy "news is public" on news for select using (true);

-- ---------------------------------------------------------------------------
-- education_tracks
-- ---------------------------------------------------------------------------
create table if not exists education_tracks (
  id text primary key,
  title text not null,
  intro text not null default '',
  sort_order int not null default 0
);

alter table education_tracks add column if not exists title text not null;
alter table education_tracks add column if not exists intro text not null default '';
alter table education_tracks add column if not exists sort_order int not null default 0;

alter table education_tracks enable row level security;
drop policy if exists "education tracks are public" on education_tracks;
create policy "education tracks are public" on education_tracks for select using (true);

-- ---------------------------------------------------------------------------
-- materials
-- ---------------------------------------------------------------------------
create table if not exists materials (
  id text primary key,
  track text not null,
  title text not null,
  meta text not null,
  body text[] not null default '{}',
  sort_order int not null default 0
);

alter table materials add column if not exists track text not null;
alter table materials add column if not exists title text not null;
alter table materials add column if not exists meta text not null;
alter table materials add column if not exists body text[] not null default '{}';
alter table materials add column if not exists sort_order int not null default 0;

alter table materials enable row level security;
drop policy if exists "materials are public" on materials;
create policy "materials are public" on materials for select using (true);

-- ---------------------------------------------------------------------------
-- favorites
-- ---------------------------------------------------------------------------
create table if not exists favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null references events (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table favorites add column if not exists created_at timestamptz not null default now();

alter table favorites enable row level security;
drop policy if exists "favorites are owner-only" on favorites;
create policy "favorites are owner-only" on favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- ratings
-- ---------------------------------------------------------------------------
create table if not exists ratings (
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null references events (id) on delete cascade,
  value int not null check (value between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table ratings add column if not exists value int not null check (value between 1 and 5);
alter table ratings add column if not exists created_at timestamptz not null default now();

alter table ratings enable row level security;
drop policy if exists "ratings are owner-only" on ratings;
create policy "ratings are owner-only" on ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- submissions
-- ---------------------------------------------------------------------------
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  category text,
  themes text[] not null default '{}',
  age_min int check (age_min is null or age_min between 0 and 99),
  age_max int check (age_max is null or age_max between 0 and 99),
  format text,
  price text check (price in ('free', 'paid')),
  cost text,
  charity boolean not null default false,
  level text check (level in ('local', 'intl')),
  event_date date,
  event_date_end date,
  event_time text,
  deadline_date date,
  address text,
  audience text,
  description text,
  registration_url text,
  extra_link_title text,
  extra_link_url text,
  instagram text,
  telegram text,
  whatsapp text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  published_event_id text references events (id),
  image_url text
);

alter table submissions add column if not exists title text not null;
alter table submissions add column if not exists category text;
alter table submissions add column if not exists themes text[] not null default '{}';
alter table submissions add column if not exists age_min int check (age_min is null or age_min between 0 and 99);
alter table submissions add column if not exists age_max int check (age_max is null or age_max between 0 and 99);
alter table submissions add column if not exists format text;
alter table submissions add column if not exists price text check (price in ('free', 'paid'));
alter table submissions add column if not exists cost text;
alter table submissions add column if not exists charity boolean not null default false;
alter table submissions add column if not exists level text check (level in ('local', 'intl'));
alter table submissions add column if not exists event_date date;
alter table submissions add column if not exists event_date_end date;
alter table submissions add column if not exists event_time text;
alter table submissions add column if not exists deadline_date date;
alter table submissions add column if not exists address text;
alter table submissions add column if not exists audience text;
alter table submissions add column if not exists description text;
alter table submissions add column if not exists registration_url text;
alter table submissions add column if not exists extra_link_title text;
alter table submissions add column if not exists extra_link_url text;
alter table submissions add column if not exists instagram text;
alter table submissions add column if not exists telegram text;
alter table submissions add column if not exists whatsapp text;
alter table submissions add column if not exists status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'));
alter table submissions add column if not exists created_at timestamptz not null default now();
alter table submissions add column if not exists published_event_id text references events (id);
alter table submissions add column if not exists image_url text;

alter table submissions enable row level security;
drop policy if exists "submissions are owner-only" on submissions;
create policy "submissions are owner-only" on submissions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- avatars: public storage bucket for profile pictures, one folder per user
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Avatar images are publicly accessible" on storage.objects;
create policy "Avatar images are publicly accessible" on storage.objects
  for select using (bucket_id = 'avatars');
drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------------
-- posts: public storage bucket for event/news photos, admin-only writes
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('posts', 'posts', true)
on conflict (id) do nothing;

drop policy if exists "Post images are publicly accessible" on storage.objects;
create policy "Post images are publicly accessible" on storage.objects
  for select using (bucket_id = 'posts');
drop policy if exists "Authenticated users can upload post images" on storage.objects;
create policy "Authenticated users can upload post images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'posts');
drop policy if exists "Admins can update post images" on storage.objects;
create policy "Admins can update post images" on storage.objects
  for update to authenticated
  using (bucket_id = 'posts' and exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
drop policy if exists "Admins can delete post images" on storage.objects;
create policy "Admins can delete post images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'posts' and exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Backend calls always use the service_role key, which bypasses RLS -
-- the policies above only protect direct client (anon/authenticated) access,
-- e.g. if the frontend is ever extended to query Supabase directly.
