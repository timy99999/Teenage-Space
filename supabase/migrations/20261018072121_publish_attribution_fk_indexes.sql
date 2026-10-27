-- Covering indexes for the published_by FKs added in publish_attribution — the
-- performance advisor flags an FK column with no index.
--
-- This was applied by hand from the Supabase dashboard, which stamped it with a
-- timestamp earlier than publish_attribution's, so it now sorts before the
-- migration that creates the column it indexes. Reordering would mean rewriting
-- history the database has already recorded, so instead the columns are declared
-- here too: on the live database both statements are no-ops, and a replay from
-- scratch no longer depends on the order.
alter table events add column if not exists published_by uuid references profiles (id) on delete set null;
alter table news add column if not exists published_by uuid references profiles (id) on delete set null;

create index if not exists events_published_by_idx on events (published_by);
create index if not exists news_published_by_idx on news (published_by);
