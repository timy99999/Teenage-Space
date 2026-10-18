-- "Дополнительная ссылка" becomes a repeatable list: events/submissions gain
-- extra_links (jsonb array of {title, url}), replacing the single
-- extra_link_title/extra_link_url pair. Existing single links are backfilled
-- into the array before the old columns are dropped.

alter table events add column if not exists extra_links jsonb not null default '[]';
update events
set extra_links = jsonb_build_array(jsonb_build_object('title', extra_link_title, 'url', extra_link_url))
where extra_link_url is not null and extra_link_url <> '' and extra_links = '[]';

alter table submissions add column if not exists extra_links jsonb not null default '[]';
update submissions
set extra_links = jsonb_build_array(jsonb_build_object('title', extra_link_title, 'url', extra_link_url))
where extra_link_url is not null and extra_link_url <> '' and extra_links = '[]';

alter table events drop column if exists extra_link_title;
alter table events drop column if exists extra_link_url;
alter table submissions drop column if exists extra_link_title;
alter table submissions drop column if exists extra_link_url;
