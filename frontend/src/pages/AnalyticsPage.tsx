import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCapacity } from '../hooks/useCapacity';
import { useTrafficSummary, useTrafficOnline } from '../hooks/useTraffic';
import { useBarsAnalytics } from '../hooks/useBars';
import { BarChart } from '../components/BarChart';

const BUCKET_LABELS: Record<string, string> = {
  avatars: 'Аватары',
  posts: 'Картинки постов'
};

const LINK_KIND_LABELS: Record<string, string> = {
  registration: 'Регистрация',
  instagram: 'Instagram',
  telegram: 'Telegram',
  extra_link: 'Доп. ссылка',
  news_link: 'Ссылка в новости'
};

const DEVICE_LABELS: Record<string, string> = {
  mobile: 'Телефон',
  tablet: 'Планшет',
  desktop: 'Компьютер'
};

const TABS = [
  { key: 'capacity', label: 'Хранилище' },
  { key: 'users', label: 'Пользователи' },
  { key: 'traffic', label: 'Посещаемость' },
  { key: 'bars', label: 'Барс' }
] as const;

const BARS_WINDOW_DAYS = 14;

const LIMITED_BY_LABELS: Record<string, string> = {
  database: 'место в базе данных',
  'avatar-storage': 'место под аватары в файловом хранилище',
  'auth-plan': 'лимит тарифа авторизации (MAU)'
};

type TabKey = (typeof TABS)[number]['key'];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  const units = ['КБ', 'МБ', 'ГБ'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

function dayLabel(isoDate: string): string {
  const [, month, day] = isoDate.split('-');
  return `${day}.${month}`;
}

function formatCompact(n: number): string {
  return new Intl.NumberFormat('ru-RU', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

function UsageBar({ label, usedBytes, limitBytes }: { label: string; usedBytes: number; limitBytes: number }) {
  const percent = limitBytes > 0 ? Math.min(100, (usedBytes / limitBytes) * 100) : 0;
  const warn = percent >= 80;

  return (
    <div className="ts-card-panel">
      <h2>{label}</h2>
      <div className="desc">
        {formatBytes(usedBytes)} из {formatBytes(limitBytes)} ({percent.toFixed(1)}%)
      </div>
      <div className="ts-usage-bar">
        <div className={`ts-usage-bar-fill${warn ? ' warn' : ''}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function CapacityTab() {
  const { capacity } = useCapacity();

  if (!capacity) return <p className="ts-center-note">Загрузка...</p>;

  const { database, storage, capacityEstimate } = capacity;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <UsageBar label="База данных" usedBytes={database.usedBytes} limitBytes={database.limitBytes} />
      <UsageBar label="Файловое хранилище" usedBytes={storage.usedBytes} limitBytes={storage.limitBytes} />

      <div className="ts-card-panel">
        <h2>По бакетам</h2>
        <div className="ts-admin-stats">
          {storage.buckets.map((b) => (
            <div className="ts-admin-stat" key={b.bucket}>
              <div className="ts-admin-stat-value">{formatBytes(b.bytes)}</div>
              <div className="desc">
                {BUCKET_LABELS[b.bucket] ?? b.bucket} ({b.fileCount} фото)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Прогноз по постам</h2>
        {capacityEstimate.estimatedRemainingPosts !== null ? (
          <>
            <div className="ts-admin-stats">
              <div className="ts-admin-stat">
                <div className="ts-admin-stat-value">{capacityEstimate.estimatedRemainingPosts}</div>
                <div className="desc">постов ещё можно опубликовать</div>
              </div>
            </div>
            <div className="desc" style={{ marginTop: 14 }}>
              Оценка на основе среднего размера уже загруженной картинки поста (
              {formatBytes(capacityEstimate.avgPostBytes ?? 0)}) и свободного места в хранилище. Реальное число
              зависит от размера конкретных файлов, которые будут загружать пользователи.
            </div>
          </>
        ) : (
          <div className="desc">Недостаточно данных для оценки — пока не загружено ни одной картинки поста.</div>
        )}
      </div>
    </div>
  );
}

function UsersTab() {
  const { capacity } = useCapacity();

  if (!capacity) return <p className="ts-center-note">Загрузка...</p>;
  if (!capacity.users) {
    return <p className="ts-center-note">Статистика по пользователям станет доступна после обновления базы.</p>;
  }

  const u = capacity.users;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <div className="ts-card-panel">
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{u.registeredTotal}</div>
            <div className="desc">зарегистрировано</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{u.onlineNow}</div>
            <div className="desc">сейчас на сайте</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{u.peakConcurrentToday}</div>
            <div className="desc">пик за час сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{u.bannedTotal}</div>
            <div className="desc">забанено</div>
          </div>
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Сколько места занимают пользователи</h2>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatBytes(u.dataUsedBytes)}</div>
            <div className="desc">в базе данных суммарно</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">≈ {formatBytes(u.bytesPerUserEstimate)}</div>
            <div className="desc">на одного пользователя (оценка)</div>
          </div>
        </div>
        <div className="desc" style={{ marginTop: 14 }}>
          Считаются таблицы профилей, избранного, оценок и заявок на публикацию. Аватары хранятся отдельно —
          в файловом хранилище (вкладка «Хранилище»). Данные посещаемости не входят: они автоматически
          чистятся и не растут вместе с числом пользователей.
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Сколько ещё регистраций выдержит</h2>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">≈ {u.estimatedRemainingUsers.toLocaleString('ru-RU')}</div>
            <div className="desc">ещё можно зарегистрировать</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">≈ {u.estimatedMaxUsers.toLocaleString('ru-RU')}</div>
            <div className="desc">всего до потолка</div>
          </div>
        </div>
        <div className="desc" style={{ marginTop: 14 }}>
          Первым упрётся: <strong>{LIMITED_BY_LABELS[u.limitedBy] ?? u.limitedBy}</strong>. Отдельный лимит
          бесплатного тарифа авторизации — {u.mauPlanLimit.toLocaleString('ru-RU')} активных пользователей в
          месяц. Оценка приблизительная и уточняется по мере роста базы.
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Одновременная нагрузка</h2>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{u.onlineNow}</div>
            <div className="desc">онлайн прямо сейчас</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">≈ {u.concurrentSoftLimit.toLocaleString('ru-RU')}</div>
            <div className="desc">комфортный потолок</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">≈ {u.concurrentHardLimit.toLocaleString('ru-RU')}</div>
            <div className="desc">предел до апгрейда</div>
          </div>
        </div>
        <div className="desc" style={{ marginTop: 14 }}>
          «Комфортный потолок» — сколько активно кликающих пользователей сайт обслуживает без роста задержек
          на текущем тарифе Supabase. Просто открытых вкладок (без действий) выдержит в несколько раз больше.
          Дальше нужен платный тариф Supabase и второй инстанс бэкенда.
        </div>
      </div>
    </div>
  );
}

function TrafficTab() {
  const { onlineNow } = useTrafficOnline(true);
  const { summary } = useTrafficSummary(14, true);

  if (!summary) return <p className="ts-center-note">Загрузка...</p>;

  const { today, hourlyToday, peakHour, dailyTrend, topCards, deviceBreakdown, topLinks } = summary;
  const peakIndex = peakHour !== null ? hourlyToday.findIndex((h) => h.hour === peakHour) : null;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <div className="ts-card-panel">
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{onlineNow ?? '—'}</div>
            <div className="desc">сейчас на сайте</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{today.pageViews}</div>
            <div className="desc">просмотров страниц сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{today.uniqueSessions}</div>
            <div className="desc">посетителей сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{today.cardViews}</div>
            <div className="desc">просмотров карточек сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{today.loggedInSessions}</div>
            <div className="desc">залогинены сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{today.guestSessions}</div>
            <div className="desc">гостей сегодня</div>
          </div>
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Активность сегодня по часам</h2>
        <div className="desc">
          {peakHour !== null
            ? `Пик активности: ${peakHour}:00–${peakHour + 1}:00 (${hourlyToday[peakIndex ?? 0]?.views ?? 0} просмотров)`
            : 'Пока недостаточно данных за сегодня'}
        </div>
        <BarChart
          data={hourlyToday.map((h) => ({ label: String(h.hour), value: h.views }))}
          peakIndex={peakIndex}
        />
      </div>

      <div className="ts-card-panel">
        <h2>Посещения за 14 дней</h2>
        <BarChart data={dailyTrend.map((d) => ({ label: dayLabel(d.day), value: d.uniqueSessions }))} />
      </div>

      <div className="ts-card-panel">
        <h2>Популярные карточки</h2>
        {topCards.length === 0 ? (
          <div className="desc">Пока нет просмотров карточек за этот период.</div>
        ) : (
          <div className="ts-admin-stats">
            {topCards.map((c) => (
              <div className="ts-admin-stat" key={`${c.targetType}-${c.targetId}`}>
                <div className="ts-admin-stat-value">{c.views}</div>
                <div className="desc">{c.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ts-card-panel">
        <h2>Устройства</h2>
        <div className="ts-admin-stats">
          {deviceBreakdown.map((d) => (
            <div className="ts-admin-stat" key={d.deviceType}>
              <div className="ts-admin-stat-value">{d.sessions}</div>
              <div className="desc">{DEVICE_LABELS[d.deviceType] ?? d.deviceType}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Переходы по ссылкам</h2>
        {topLinks.length === 0 ? (
          <div className="desc">Пока нет кликов по ссылкам за этот период.</div>
        ) : (
          <div className="ts-admin-stats">
            {topLinks.map((l) => (
              <div className="ts-admin-stat" key={l.linkKind}>
                <div className="ts-admin-stat-value">{l.clicks}</div>
                <div className="desc">{LINK_KIND_LABELS[l.linkKind] ?? l.linkKind}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BarsTab() {
  const { analytics } = useBarsAnalytics(BARS_WINDOW_DAYS, true);

  if (!analytics) return <p className="ts-center-note">Загрузка...</p>;

  const { summary, tokenTotals, daily, costUsd, pricingConfigured, tools, topChats } = analytics;
  const totalTokens = tokenTotals.promptTokens + tokenTotals.outputTokens;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <div className="desc">За последние {BARS_WINDOW_DAYS} дней.</div>

      <div className="ts-card-panel">
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.messages}</div>
            <div className="desc">сообщений</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.conversations}</div>
            <div className="desc">диалогов</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.activeUsers}</div>
            <div className="desc">активных пользователей</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.avgTurnsPerConvo}</div>
            <div className="desc">сообщений на диалог</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.offTopic}</div>
            <div className="desc">ответов не по теме</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.errors}</div>
            <div className="desc">сбоев</div>
          </div>
        </div>
      </div>

      <div className="ts-card-panel">
        <h2>Токены</h2>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatCompact(tokenTotals.promptTokens)}</div>
            <div className="desc">на вход (prompt)</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatCompact(tokenTotals.outputTokens)}</div>
            <div className="desc">на выход</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatCompact(tokenTotals.thinkingTokens)}</div>
            <div className="desc">на размышление</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatCompact(totalTokens)}</div>
            <div className="desc">всего (вход + выход)</div>
          </div>
        </div>
        <BarChart
          data={daily.map((d) => ({
            label: dayLabel(d.day),
            value: d.promptTokens + d.outputTokens
          }))}
        />
      </div>

      <div className="ts-card-panel">
        <h2>Стоимость</h2>
        {pricingConfigured ? (
          <>
            <div className="ts-admin-stats">
              <div className="ts-admin-stat">
                <div className="ts-admin-stat-value">${costUsd.toFixed(2)}</div>
                <div className="desc">оценка за период</div>
              </div>
            </div>
            <BarChart
              data={daily.map((d) => ({ label: dayLabel(d.day), value: Math.round(d.costUsd * 100) }))}
            />
            <div className="desc" style={{ marginTop: 10 }}>
              По ценам из переменной BARS_TOKEN_PRICES. Столбцы графика — в центах.
            </div>
          </>
        ) : (
          <div className="desc">
            Цены токенов не заданы (BARS_TOKEN_PRICES). Укажите их, чтобы видеть оценку
            расходов в долларах.
          </div>
        )}
      </div>

      <div className="ts-card-panel">
        <h2>Инструменты агента</h2>
        {tools.length === 0 ? (
          <div className="desc">За этот период инструменты не вызывались.</div>
        ) : (
          <div className="ts-admin-stats">
            {tools.map((t) => (
              <div className="ts-admin-stat" key={t.tool}>
                <div className="ts-admin-stat-value">{t.calls}</div>
                <div className="desc">{t.tool}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ts-card-panel">
        <h2>Топ чатов по токенам</h2>
        {topChats.length === 0 ? (
          <div className="desc">Пока нет данных.</div>
        ) : (
          <div className="ts-admin-stats">
            {topChats.map((c) => (
              <div className="ts-admin-stat" key={c.chatId}>
                <div className="ts-admin-stat-value">
                  {formatCompact(c.promptTokens + c.outputTokens)}
                </div>
                <div className="desc">
                  {c.name ?? (c.telegramUsername ? `@${c.telegramUsername}` : `чат ${c.chatId}`)} ·{' '}
                  {c.messages} сообщ.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ts-card-panel">
        <h2>Результаты за период</h2>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.plansCreated}</div>
            <div className="desc">планов подготовки создано</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{summary.remindersSent}</div>
            <div className="desc">напоминаний отправлено</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const { profile, isSuperAdmin } = useAuth();
  const [tab, setTab] = useState<TabKey>('capacity');

  if (profile && !isSuperAdmin) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Аналитика</h1>
        <p className="ts-center-note">Доступ только для главного администратора.</p>
      </div>
    );
  }

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Аналитика</h1>
      <div className="ts-theme-btns ts-admin-tabs" style={{ marginTop: 18, marginBottom: 8 }}>
        {TABS.map((t) => (
          <button key={t.key} className={`ts-theme-btn${tab === t.key ? ' on' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'capacity' && <CapacityTab />}
      {tab === 'users' && <UsersTab />}
      {tab === 'traffic' && <TrafficTab />}
      {tab === 'bars' && <BarsTab />}
    </div>
  );
}
