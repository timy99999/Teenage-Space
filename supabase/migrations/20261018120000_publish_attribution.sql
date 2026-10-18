-- Tracks which admin published an event/news item (and when), so the super admin
-- can audit who put a card up. For events that came from a user's submission,
-- "who applied and when" is already on submissions (user_id, created_at).

alter table events add column if not exists published_by uuid references profiles (id) on delete set null;

alter table news add column if not exists published_by uuid references profiles (id) on delete set null;
alter table news add column if not exists created_at timestamptz not null default now();
