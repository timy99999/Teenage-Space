-- Per-turn diagnostics for "Барс".
--
-- Reading the transcript told us *that* answers came back cut off mid-word, looped on
-- the same reply and burned seven searches on one question -- but not why, because the
-- journal records only the text and a coarse status. This adds the numbers that make
-- the next audit a query instead of an investigation.
--
-- Additive and safe on a live table: the new column has a default, and the status CHECK
-- only gains a value.

-- ------------------------------------------------------------------ status: truncated
-- The bot now detects a budget-truncated answer, trims it back to the last complete
-- line and says so. That is neither an error nor a fallback -- the user got a usable,
-- if short, answer -- so it needs a status of its own to stay countable.

alter table bot_messages drop constraint if exists bot_messages_status_check;

alter table bot_messages add constraint bot_messages_status_check
  check (status in ('ok', 'off_topic', 'error', 'fallback', 'truncated'));

-- ------------------------------------------------------------------------- turn meta
-- Free-form on purpose: what is worth recording about a turn changes faster than a
-- migration cadence. Written best-effort by bot/bars/analytics.py, same as everything
-- else in that module -- a missing key is normal, never an error.
--
-- Keys currently written on the assistant row:
--   tool_rounds    int   agent<->tools round trips this turn (the 7-search runaway)
--   tool_calls     int   total tool invocations this turn
--   finish_reason  text  Gemini's stop reason; MAX_TOKENS is the truncation signal
--   latency_ms     int   wall clock from message received to answer sent
--   prompt_tokens / output_tokens / thinking_tokens  int

alter table bot_messages add column if not exists meta jsonb not null default '{}'::jsonb;

-- ------------------------------------------------------------------------------- RPC
-- Extends the admin chat list with the two failure shapes worth spotting at a glance.
-- The columns are appended, not reordered, so the backend's existing mapper (which
-- reads by name) keeps working and simply ignores the new ones until it is taught them.
--
-- DROP before CREATE, not CREATE OR REPLACE: adding a column to RETURNS TABLE changes
-- the function's return type, and Postgres refuses that in a replace
-- ("cannot change return type of existing function").

drop function if exists public.get_bars_chat_list(int);

create function public.get_bars_chat_list(p_days int)
returns table(
  chat_id bigint,
  telegram_username text,
  name text,
  user_id uuid,
  message_count bigint,
  last_activity_at timestamptz,
  has_error boolean,
  off_topic_count bigint,
  truncated_count bigint,
  max_tool_calls int
)
language sql
stable
security definer
set search_path = public
as $$
  select
    m.chat_id,
    tl.telegram_username,
    p.name,
    tl.user_id,
    count(*)::bigint as message_count,
    max(m.created_at) as last_activity_at,
    bool_or(m.status in ('error', 'fallback')) as has_error,
    count(*) filter (where m.status = 'off_topic')::bigint as off_topic_count,
    count(*) filter (where m.status = 'truncated')::bigint as truncated_count,
    coalesce(max((m.meta ->> 'tool_calls')::int), 0) as max_tool_calls
  from bot_messages m
  left join telegram_links tl on tl.telegram_id = m.chat_id
  left join profiles p on p.id = tl.user_id
  where m.created_at >= now() - (greatest(p_days, 1) || ' days')::interval
  group by m.chat_id, tl.telegram_username, p.name, tl.user_id
  order by max(m.created_at) desc;
$$;

revoke all on function public.get_bars_chat_list(int) from public, anon, authenticated;
grant execute on function public.get_bars_chat_list(int) to service_role;
