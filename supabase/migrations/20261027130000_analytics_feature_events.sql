-- Analytics upgrade, part 2: what people actually do here.
--
-- Tracking knew three kinds of event — a page view, a card view, an outbound
-- link click. That answers "what did they look at" but not "what did they use":
-- favourites, ratings, search, filters, submitting an event, linking the
-- Telegram bot, or the signup funnel (which was entirely invisible, since /auth
-- renders outside AppLayout and never even emitted a page view).
--
-- Rather than a new event_type per feature, there is one new type, 'feature',
-- plus a feature key pointing at a catalog table. The catalog is what makes
-- adoption readable: a ranking can be zero-filled across every known feature, so
-- "nobody uses this" shows up as a zero rather than as a missing row. Adding a
-- feature later is one insert here, and the FK rejects typos.

create table if not exists traffic_feature_catalog (
  feature text primary key,
  feature_group text not null,
  label text not null,
  detail_meaning text,
  sort_order int not null default 100,
  active boolean not null default true
);

alter table traffic_feature_catalog enable row level security;

insert into traffic_feature_catalog (feature, feature_group, label, detail_meaning, sort_order) values
  ('favorite_add',         'engagement',   'Добавил в избранное',        null,                     10),
  ('favorite_remove',      'engagement',   'Убрал из избранного',        null,                     11),
  ('rating_submit',        'engagement',   'Оценил',                     'оценка от 1 до 5',       12),
  ('share_click',          'engagement',   'Поделился',                  null,                     13),

  ('search_query',         'discovery',    'Поиск',                      'поисковый запрос',       20),
  ('search_zero_result',   'discovery',    'Поиск без результатов',      'поисковый запрос',       21),
  ('filter_apply',         'discovery',    'Применил фильтр',            'какой именно фильтр',    22),
  ('filter_reset',         'discovery',    'Сбросил фильтры',            null,                     23),

  ('track_open',           'education',    'Открыл курс',                'id курса',               30),
  ('article_open',         'education',    'Открыл статью',              'id статьи',              31),

  ('event_submit_open',    'contribution', 'Начал заявку',               null,                     40),
  ('event_submit_success', 'contribution', 'Отправил заявку',            null,                     41),

  ('profile_edit',         'account',      'Изменил профиль',            null,                     50),
  ('avatar_upload',        'account',      'Загрузил аватар',            null,                     51),
  ('telegram_link_open',   'account',      'Подключает Барса',           null,                     52),
  ('theme_toggle',         'account',      'Переключил тему',            'light или dark',         53),
  ('notifications_toggle', 'account',      'Уведомления',                'on или off',             54),
  ('logout',               'account',      'Вышел',                      null,                     55),
  ('account_delete',       'account',      'Удалил аккаунт',             null,                     56),

  ('auth_open',            'signup',       'Открыл вход',                null,                     60),
  ('auth_login_submit',    'signup',       'Отправил вход',              null,                     61),
  ('auth_login_success',   'signup',       'Вошёл',                      null,                     62),
  ('auth_google_click',    'signup',       'Вход через Google',          null,                     63),
  ('auth_reg_step1',       'signup',       'Регистрация: данные',        null,                     64),
  ('auth_reg_step2',       'signup',       'Регистрация: код подтверждён', null,                   65),
  ('auth_reg_step3',       'signup',       'Регистрация: пароль',        null,                     66),
  ('auth_reg_success',     'signup',       'Регистрация завершена',      null,                     67),
  ('auth_forgot_start',    'signup',       'Восстановление пароля',      null,                     68),
  ('auth_forgot_success',  'signup',       'Пароль восстановлен',        null,                     69)
on conflict (feature) do nothing;

-- The check has to be widened BEFORE the frontend starts sending these: the
-- ingestion path swallows every error by design (a tracking hiccup must never
-- surface to a visitor), so a constraint violation would drop the events with
-- nothing but a log line to show for it.
alter table traffic_events drop constraint if exists traffic_events_event_type_check;
alter table traffic_events add constraint traffic_events_event_type_check
  check (event_type in ('page_view', 'card_view', 'link_click', 'feature'));

alter table traffic_events add column if not exists feature text references traffic_feature_catalog (feature);
alter table traffic_events add column if not exists detail text;

alter table traffic_events drop constraint if exists traffic_events_detail_len;
alter table traffic_events add constraint traffic_events_detail_len
  check (detail is null or length(detail) <= 120);

alter table traffic_events drop constraint if exists traffic_events_feature_req;
alter table traffic_events add constraint traffic_events_feature_req
  check ((event_type = 'feature') = (feature is not null));

create index if not exists traffic_events_feature_created_idx
  on traffic_events (feature, created_at) where event_type = 'feature';
