-- Granular per-admin permissions + timed bans with a reason.
--
-- admin_perms: map of feature-flag → bool for role='admin' accounts. Empty map
-- means the admin has no panel access yet (super_admin grants features one by
-- one). super_admin bypasses the map entirely in code.
--
-- Bans gain a duration and a reason. is_banned stays the source of truth:
--   is_banned = true,  ban_expires_at = null  -> permanent
--   is_banned = true,  ban_expires_at set     -> lifts automatically once past
--   is_banned = false                          -> not banned
-- All safe to re-run.

alter table profiles add column if not exists admin_perms   jsonb not null default '{}'::jsonb;
alter table profiles add column if not exists ban_expires_at timestamptz;
alter table profiles add column if not exists ban_reason     text;
alter table profiles add column if not exists banned_at      timestamptz;
