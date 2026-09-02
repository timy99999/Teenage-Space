-- Events can belong to several categories at once (admins pick multiple; public
-- submissions still carry a single `category`). `category` is kept as the
-- canonical "primary" value — first of `categories` — so every single-value read
-- (nav breadcrumb, modal label, home counts) keeps working unchanged.

alter table events add column if not exists categories text[] not null default '{}';

-- Backfill existing rows from the single `category` column.
update events
set categories = array[category]
where categories = '{}' and category is not null and category <> '';

-- Category-tab filtering does `categories @> array['<key>']` / `&& array[...]`.
create index if not exists events_categories_gin on events using gin (categories);
