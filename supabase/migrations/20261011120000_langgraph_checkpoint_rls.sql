-- LangGraph's checkpoint tables (checkpoints, checkpoint_blobs, checkpoint_writes,
-- checkpoint_migrations) are created by the library itself at boot
-- (checkpointer.setup() in bot/bars/graph/agent.py), not by a migration here --
-- see the note in 20260828190000_bars_bot.sql. That means they were never
-- RLS-enabled, so Supabase's Security Advisor flagged them as publicly
-- readable/writable via the Data API (rls_disabled_in_public).
--
-- Same treatment as the rest of the bot's tables: RLS on, no policies. Only
-- service_role and the bot's direct Postgres connection (which the pooler
-- grants bypassrls-equivalent access to) can touch them; anon/authenticated
-- get nothing. `if exists` because a fresh environment may not have run the
-- bot once yet, so the tables may not exist.

alter table if exists checkpoints enable row level security;
alter table if exists checkpoint_blobs enable row level security;
alter table if exists checkpoint_writes enable row level security;
alter table if exists checkpoint_migrations enable row level security;
