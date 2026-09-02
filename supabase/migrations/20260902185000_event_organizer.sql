-- Optional organizer attribution for an event, set by admins only. The name is
-- shown in the top-left corner of the event card / modal image and links to
-- `organizer_url` when present.

alter table events add column if not exists organizer_name text;
alter table events add column if not exists organizer_url text;
