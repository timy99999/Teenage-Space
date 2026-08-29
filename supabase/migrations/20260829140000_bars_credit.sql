-- A place to record the Gemini API prepaid top-up so the admin can watch an
-- *estimate* of the remaining balance on the site. Google exposes no API for the
-- real prepaid balance (it lives only in the AI Studio Billing tab), so the
-- "Барс" tab shows: topped_up_usd − our own token-cost estimate since topped_up_at.
--
-- One row, id fixed to 1. RLS on, no policies — only the backend (service_role)
-- touches it, same as the other bot_* tables.

create table if not exists bot_credit (
  id             int primary key default 1 check (id = 1),
  topped_up_usd  numeric(10, 2) not null default 0,
  topped_up_at   date not null default current_date,
  note           text,
  updated_at     timestamptz not null default now()
);

insert into bot_credit (id) values (1) on conflict (id) do nothing;

alter table bot_credit enable row level security;

-- Catalogue-embedding spend is booked against chat_id 0 (see bot/bars/analytics.py
-- SYSTEM_CHAT_ID). Keep it out of the per-chat leaderboard — it is not a chat.
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
      and chat_id <> 0
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
  where coalesce(msg.chat_id, usg.chat_id) <> 0
  order by (coalesce(usg.prompt_tokens, 0) + coalesce(usg.output_tokens, 0)
            + coalesce(usg.thinking_tokens, 0)) desc,
           coalesce(msg.messages, 0) desc
  limit greatest(p_limit, 1);
$$;

revoke all on function public.get_bars_top_chats(int, int) from public, anon, authenticated;
grant execute on function public.get_bars_top_chats(int, int) to service_role;
