-- Covering indexes for the published_by FKs added in publish_attribution — the
-- performance advisor flags an FK column with no index.

create index if not exists events_published_by_idx on events (published_by);
create index if not exists news_published_by_idx on news (published_by);
