-- "Барс" — the Telegram RAG agent (bot/ service). Everything the bot owns lives
-- here: the optional Telegram<->account link, the pgvector index over the event
-- catalogue, 3-day conversation sessions, prep plans and the reminder queue.
--
-- Every table below is RLS-enabled with *no* policies, same as the traffic_*
-- tables: nothing but service_role (backend) and the bot's direct Postgres
-- connection can touch them. LangGraph's own checkpoint tables are created by
-- the library at boot (checkpointer.setup()), so they are deliberately absent.

create extension if not exists vector;

-- ---------------------------------------------------------------- account link
-- Linking is optional: Барс answers anonymous chats too, it just cannot
-- personalise or write favourites for them.

create table if not exists telegram_links (
  telegram_id bigint primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  telegram_username text,
  linked_at timestamptz not null default now()
);

alter table telegram_links enable row level security;

-- One-time deep-link tokens minted by the site (POST /api/profile/telegram-link)
-- and burned by the bot on /start <token>.
create table if not exists telegram_link_tokens (
  token text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

alter table telegram_link_tokens enable row level security;

create index if not exists telegram_link_tokens_user_idx
  on telegram_link_tokens (user_id);

-- ------------------------------------------------------------------ RAG index
-- content_hash lets the indexer skip unchanged events, so a re-index run costs
-- nothing when the catalogue is quiet. 768 dims = gemini embeddings truncated
-- to the dimension we ask for; changing it means re-embedding everything.

create table if not exists bot_event_embeddings (
  event_id text primary key references events(id) on delete cascade,
  content_hash text not null,
  embedding vector(768) not null,
  indexed_at timestamptz not null default now()
);

alter table bot_event_embeddings enable row level security;

create index if not exists bot_event_embeddings_vec_idx
  on bot_event_embeddings using hnsw (embedding vector_cosine_ops);

-- Ranking only: returns ids + scores, never event columns. The bot hydrates the
-- rows from GET /api/events so the catalogue keeps a single source of truth.
-- Archived events are dropped here rather than downstream so match_count is not
-- wasted on rows the bot would throw away anyway.
create or replace function public.match_events(
  query_embedding vector(768),
  match_count int default 40
)
returns table(event_id text, similarity float)
language sql
stable
security definer
set search_path = public
as $$
  select b.event_id, 1 - (b.embedding <=> query_embedding) as similarity
  from bot_event_embeddings b
  join events e on e.id = b.event_id
  where e.archived = false
  order by b.embedding <=> query_embedding
  limit greatest(match_count, 1);
$$;

revoke all on function public.match_events(vector, int) from public, anon, authenticated;
grant execute on function public.match_events(vector, int) to service_role;

-- ------------------------------------------------------------------- sessions
-- The 3-day memory rule. thread_id is what LangGraph checkpoints against;
-- rotating it is how Барс "forgets" and starts over. TTL is sliding: 72h since
-- the last message, so an active conversation is never cut mid-preparation.

create table if not exists bot_sessions (
  chat_id bigint primary key,
  thread_id text not null,
  started_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now()
);

alter table bot_sessions enable row level security;

create index if not exists bot_sessions_last_activity_idx
  on bot_sessions (last_activity_at);

-- ---------------------------------------------------------------------- plans
-- Survives the 3-day wipe on purpose: the dialogue is disposable, the plan the
-- teenager asked for is not.

create table if not exists bot_plans (
  id uuid primary key default gen_random_uuid(),
  chat_id bigint not null,
  event_id text references events(id) on delete set null,
  title text not null,
  created_at timestamptz not null default now()
);

alter table bot_plans enable row level security;

create index if not exists bot_plans_chat_idx on bot_plans (chat_id, created_at desc);

create table if not exists bot_plan_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references bot_plans(id) on delete cascade,
  step_no int not null,
  title text not null,
  detail text,
  due_date date,
  done boolean not null default false,
  unique (plan_id, step_no)
);

alter table bot_plan_items enable row level security;

-- ------------------------------------------------------------------ reminders
-- Queue, not an in-memory scheduler: Railway restarts the container on every
-- push to main and an APScheduler memory jobstore would silently lose the lot.

create table if not exists bot_reminders (
  id uuid primary key default gen_random_uuid(),
  chat_id bigint not null,
  fire_at timestamptz not null,
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  attempts int not null default 0,
  last_error text
);

alter table bot_reminders enable row level security;

create index if not exists bot_reminders_due_idx
  on bot_reminders (fire_at) where sent_at is null;

create index if not exists bot_reminders_chat_idx on bot_reminders (chat_id);
