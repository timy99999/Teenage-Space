-- Observability for "Барс" (bot/): a readable transcript for quality control and a
-- token-usage rollup for the admin analytics.
--
-- Same RLS posture as the other bot_* / traffic_* tables: RLS on, *no* policies, so
-- only service_role (backend) and the bot's direct Postgres connection can read or
-- write. Aggregates for the Analytics page go through security-definer RPCs granted
-- to service_role only, exactly like 20260828103623_traffic_analytics.sql.

-- --------------------------------------------------------------- transcript log
-- Deliberately NOT wiped by /reset or the 72h session sweep — this is an audit
-- trail, not conversation memory. It has its own retention: bot/bars/sessions.py
-- sweep() deletes rows older than TRANSCRIPT_TTL_DAYS (default 30). On the Free
-- tier the database is the binding capacity limit, so the window stays short.

create table if not exists bot_messages (
  id         bigserial primary key,
  chat_id    bigint not null,
  user_id    uuid references auth.users(id) on delete set null,
  role       text not null check (role in ('user', 'assistant')),
  text       text not null,
  status     text not null default 'ok'
             check (status in ('ok', 'off_topic', 'error', 'fallback')),
  tools      text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table bot_messages enable row level security;

create index if not exists bot_messages_chat_idx on bot_messages (chat_id, created_at desc);
create index if not exists bot_messages_created_idx on bot_messages (created_at);
create index if not exists bot_messages_user_idx on bot_messages (user_id);

-- ------------------------------------------------------------- token-usage rollup
-- One row per (Bishkek day, chat, model), upserted on every turn. Grows with active
-- chats, not with total history, so it never needs sweeping and outlives the
-- transcript — cost trends survive after the conversations behind them are gone.

create table if not exists bot_usage_daily (
  day             date not null,
  chat_id         bigint not null,
  model           text not null,
  turns           int not null default 0,
  prompt_tokens   bigint not null default 0,
  output_tokens   bigint not null default 0,
  thinking_tokens bigint not null default 0,
  primary key (day, chat_id, model)
);

alter table bot_usage_daily enable row level security;

create index if not exists bot_usage_daily_day_idx on bot_usage_daily (day);

-- ------------------------------------------------------------------------- RPCs

-- Per-day, per-model token totals for the last p_days Bishkek days. Not zero-filled
-- on the day axis: the backend expands the calendar and fills gaps (it also needs
-- the per-model split for the cost estimate).
create or replace function public.get_bars_daily_usage(p_days int)
returns table(
  day date,
  model text,
  turns bigint,
  prompt_tokens bigint,
  output_tokens bigint,
  thinking_tokens bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    u.day,
    u.model,
    sum(u.turns)::bigint,
    sum(u.prompt_tokens)::bigint,
    sum(u.output_tokens)::bigint,
    sum(u.thinking_tokens)::bigint
  from bot_usage_daily u
  where u.day >= (now() at time zone 'Asia/Bishkek')::date - (greatest(p_days, 1) - 1)
  group by u.day, u.model
  order by u.day;
$$;

revoke all on function public.get_bars_daily_usage(int) from public, anon, authenticated;
grant execute on function public.get_bars_daily_usage(int) to service_role;

-- Headline counters for the last p_days days. Single row.
create or replace function public.get_bars_summary(p_days int)
returns table(
  messages bigint,
  user_messages bigint,
  conversations bigint,
  active_users bigint,
  off_topic bigint,
  errors bigint,
  plans_created bigint,
  reminders_sent bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with win as (select now() - (greatest(p_days, 1) || ' days')::interval as since)
  select
    (select count(*) from bot_messages, win where created_at >= win.since),
    (select count(*) from bot_messages, win where role = 'user' and created_at >= win.since),
    (select count(distinct chat_id) from bot_messages, win where created_at >= win.since),
    (select count(distinct user_id) from bot_messages, win
       where user_id is not null and created_at >= win.since),
    (select count(*) from bot_messages, win where status = 'off_topic' and created_at >= win.since),
    (select count(*) from bot_messages, win where status in ('error', 'fallback') and created_at >= win.since),
    (select count(*) from bot_plans, win where created_at >= win.since),
    (select count(*) from bot_reminders, win where sent_at is not null and sent_at >= win.since);
$$;

revoke all on function public.get_bars_summary(int) from public, anon, authenticated;
grant execute on function public.get_bars_summary(int) to service_role;

-- How often each agent tool was invoked over the last p_days days.
create or replace function public.get_bars_tool_usage(p_days int)
returns table(tool text, calls bigint)
language sql
stable
security definer
set search_path = public
as $$
  select t.tool, count(*)::bigint as calls
  from bot_messages m
  cross join lateral unnest(m.tools) as t(tool)
  where m.created_at >= now() - (greatest(p_days, 1) || ' days')::interval
  group by t.tool
  order by calls desc;
$$;

revoke all on function public.get_bars_tool_usage(int) from public, anon, authenticated;
grant execute on function public.get_bars_tool_usage(int) to service_role;

-- Chats ranked by token spend over the last p_days days, resolved to a name where
-- the chat is linked to an account.
create or replace function public.get_bars_top_chats(p_days int, p_limit int)
returns table(
  chat_id bigint,
  telegram_username text,
  name text,
  messages bigint,
  prompt_tokens bigint,
  output_tokens bigint,
  thinking_tokens bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with msg as (
    select chat_id, count(*)::bigint as messages
    from bot_messages
    where created_at >= now() - (greatest(p_days, 1) || ' days')::interval
    group by chat_id
  ),
  usg as (
    select chat_id,
           sum(prompt_tokens)::bigint as prompt_tokens,
           sum(output_tokens)::bigint as output_tokens,
           sum(thinking_tokens)::bigint as thinking_tokens
    from bot_usage_daily
    where day >= (now() at time zone 'Asia/Bishkek')::date - (greatest(p_days, 1) - 1)
    group by chat_id
  )
  select
    coalesce(msg.chat_id, usg.chat_id) as chat_id,
    tl.telegram_username,
    p.name,
    coalesce(msg.messages, 0)::bigint,
    coalesce(usg.prompt_tokens, 0)::bigint,
    coalesce(usg.output_tokens, 0)::bigint,
    coalesce(usg.thinking_tokens, 0)::bigint
  from msg
  full join usg on usg.chat_id = msg.chat_id
  left join telegram_links tl on tl.telegram_id = coalesce(msg.chat_id, usg.chat_id)
  left join profiles p on p.id = tl.user_id
  order by (coalesce(usg.prompt_tokens, 0) + coalesce(usg.output_tokens, 0)
            + coalesce(usg.thinking_tokens, 0)) desc,
           coalesce(msg.messages, 0) desc
  limit greatest(p_limit, 1);
$$;

revoke all on function public.get_bars_top_chats(int, int) from public, anon, authenticated;
grant execute on function public.get_bars_top_chats(int, int) to service_role;

-- One row per conversation seen in the last p_days days, for the "Барс" admin page.
create or replace function public.get_bars_chat_list(p_days int)
returns table(
  chat_id bigint,
  telegram_username text,
  name text,
  user_id uuid,
  message_count bigint,
  last_activity_at timestamptz,
  has_error boolean,
  off_topic_count bigint
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
    count(*) filter (where m.status = 'off_topic')::bigint as off_topic_count
  from bot_messages m
  left join telegram_links tl on tl.telegram_id = m.chat_id
  left join profiles p on p.id = tl.user_id
  where m.created_at >= now() - (greatest(p_days, 1) || ' days')::interval
  group by m.chat_id, tl.telegram_username, p.name, tl.user_id
  order by max(m.created_at) desc;
$$;

revoke all on function public.get_bars_chat_list(int) from public, anon, authenticated;
grant execute on function public.get_bars_chat_list(int) to service_role;
