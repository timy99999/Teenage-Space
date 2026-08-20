-- Teenage Space - Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: one row per auth.users user, holds the public-facing account info
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
  created_at timestamptz not null default now(),
  role text not null default 'user' check (role in ('user', 'admin')),
  is_banned boolean not null default false
);

alter table profiles enable row level security;

create policy "profiles are readable by owner" on profiles
  for select using (auth.uid() = id);
create policy "profiles are insertable by owner" on profiles
  for insert with check (auth.uid() = id);
create policy "profiles are updatable by owner" on profiles
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- events: the public catalogue of opportunities
-- ---------------------------------------------------------------------------
create table if not exists events (
  id text primary key,
  title text not null,
  category text not null,
  themes text[] not null default '{}',
  age_min int not null,
  age_max int not null,
  age_label text not null,
  price text not null check (price in ('free', 'paid')),
  cost text,
  level text not null check (level in ('local', 'intl')),
  format text not null,
  event_date date not null,
  deadline_date date,
  place text not null,
  short_desc text not null,
  description text not null,
  instagram boolean not null default false,
  registration_url text,
  is_past boolean not null default false,
  image_url text
);

alter table events enable row level security;
create policy "events are public" on events for select using (true);

-- ---------------------------------------------------------------------------
-- news
-- ---------------------------------------------------------------------------
create table if not exists news (
  id text primary key,
  title text not null,
  event_date date not null,
  short_desc text not null,
  image_url text
);

alter table news enable row level security;
create policy "news is public" on news for select using (true);

-- ---------------------------------------------------------------------------
-- materials: education articles, grouped by track (edu-nct / edu-abroad)
-- ---------------------------------------------------------------------------
create table if not exists materials (
  id text primary key,
  track text not null,
  title text not null,
  meta text not null,
  body text[] not null default '{}',
  sort_order int not null default 0
);

alter table materials enable row level security;
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

alter table favorites enable row level security;
create policy "favorites are owner-only" on favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- ratings: one vote per user per (past) event
-- ---------------------------------------------------------------------------
create table if not exists ratings (
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id text not null references events (id) on delete cascade,
  value int not null check (value between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

alter table ratings enable row level security;
create policy "ratings are owner-only" on ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- submissions: "publish an event" requests, reviewed by an admin
-- ---------------------------------------------------------------------------
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  categories text[] not null default '{}',
  themes text[] not null default '{}',
  ages text[] not null default '{}',
  format text[] not null default '{}',
  price text check (price in ('free', 'paid')),
  cost text,
  charity boolean not null default false,
  level text check (level in ('local', 'intl')),
  event_date date,
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

alter table submissions enable row level security;
create policy "submissions are owner-only" on submissions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- avatars: public storage bucket for profile pictures, one folder per user
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "Users can upload their own avatar" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users can update their own avatar" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users can delete their own avatar" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------------
-- posts: public storage bucket for event/news photos, admin-only writes
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('posts', 'posts', true)
on conflict (id) do nothing;

create policy "Post images are publicly accessible" on storage.objects
  for select using (bucket_id = 'posts');
create policy "Authenticated users can upload post images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'posts');
create policy "Admins can update post images" on storage.objects
  for update to authenticated
  using (bucket_id = 'posts' and exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admins can delete post images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'posts' and exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Backend calls always use the service_role key, which bypasses RLS -
-- the policies above only protect direct client (anon/authenticated) access,
-- e.g. if the frontend is ever extended to query Supabase directly.
