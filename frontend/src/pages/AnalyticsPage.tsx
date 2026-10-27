import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useCapacity } from '../hooks/useCapacity';
import {
  fetchAnalyticsDigest,
  useFeatureAdoption,
  useGrowth,
  useRetention,
  useSearchInsights,
  useSignupFunnel,
  useTopPages,
  useTopUsers,
  useTrafficSummary,
  useTrafficOnline
} from '../hooks/useTraffic';
import { useBarsAnalytics, setBarsCredit } from '../hooks/useBars';
import type { BarsCredit, FeatureAdoption } from '../types';
import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { RankBars } from '../components/RankBars';
import { CohortGrid } from '../components/CohortGrid';

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
  { key: 'growth', label: 'Рост' },
  { key: 'traffic', label: 'Посещаемость' },
  { key: 'bars', label: 'Барс' }
] as const;

const BARS_WINDOW_DAYS = 14;
const GROWTH_PERIODS = [14, 30, 90] as const;
const RETENTION_COLUMNS = ['День 1', 'Неделя', 'Месяц'];

const FEATURE_GROUP_LABELS: Record<string, string> = {
  engagement: 'Вовлечённость',
  discovery: 'Поиск и фильтры',
  education: 'Образование',
  contribution: 'Заявки',
  account: 'Аккаунт'
};
// Shown as a funnel below instead of in the adoption ranking, so the steps
// aren't counted twice.
const FUNNEL_GROUP = 'signup';

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

/** Engaged time, in the units a person would say it in. */
function formatDuration(ms: number | null): string {
  if (ms === null) return '—';
  const totalMinutes = Math.round(ms / 60000);
  if (totalMinutes < 1) return `${Math.round(ms / 1000)} с`;
  if (totalMinutes < 60) return `${totalMinutes} мин`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes === 0 ? `${hours} ч` : `${hours} ч ${minutes} мин`;
}

function weekLabel(isoDate: string): string {
  const [, month, day] = isoDate.split('-');
  return `${day}.${month}`;
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

function DigestCard({ days }: { days: number }) {
  const { flash } = useUI();
  const [busy, setBusy] = useState(false);

  async function copyReport() {
    setBusy(true);
    try {
      const digest = await fetchAnalyticsDigest(days);
      await navigator.clipboard.writeText(JSON.stringify(digest));
      flash('Отчёт скопирован — вставь его в чат с Claude');
    } catch {
      flash('Не удалось получить отчёт');
    } finally {
      setBusy(false);
    }
  }

  async function downloadReport() {
    setBusy(true);
    try {
      const digest = await fetchAnalyticsDigest(days);
      const url = URL.createObjectURL(new Blob([JSON.stringify(digest, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `teenage-space-analytics-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      flash('Не удалось получить отчёт');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ts-card-panel">
      <h2>Отчёт для Claude</h2>
      <div className="desc">
        Сводка за {days} дней одним JSON: рост, время на сайте, функции, удержание, воронка, топ
        пользователей. Скопируй и вставь в чат — этого хватит для анализа, выгружать базу не нужно.
      </div>
      <div className="ts-digest-row">
        <button className="ts-btn-outline small" onClick={copyReport} disabled={busy}>
          Скопировать
        </button>
        <button className="ts-btn-outline small" onClick={downloadReport} disabled={busy}>
          Скачать файлом
        </button>
      </div>
    </div>
  );
}

function FeatureAdoptionCard({ features }: { features: FeatureAdoption[] }) {
  const groups = Object.keys(FEATURE_GROUP_LABELS).filter((g) =>
    features.some((f) => f.group === g)
  );

  return (
    <div className="ts-card-panel">
      <h2>Какими функциями пользуются</h2>
      <div className="desc">
        Доля активных пользователей, которые хоть раз воспользовались функцией за период. Ноль — это
        тоже результат: функцией не пользуются.
      </div>
      {groups.map((group) => (
        <div key={group} style={{ marginTop: 18 }}>
          <div className="ts-rank-hint" style={{ marginBottom: 2 }}>
            {FEATURE_GROUP_LABELS[group]}
          </div>
          <RankBars
            items={features
              .filter((f) => f.group === group)
              .sort((a, b) => b.users - a.users)
              .map((f) => ({
                label: f.label,
                value: f.users,
                hint: f.adoptionPct === null ? undefined : `${f.adoptionPct}% активных · ${f.events} раз`,
                delta: f.prevUsers === 0 ? null : f.users - f.prevUsers
              }))}
            formatValue={(n) => `${n} чел.`}
          />
        </div>
      ))}
    </div>
  );
}

function GrowthTab() {
  const [days, setDays] = useState<number>(30);
  const growth = useGrowth(days, true);
  const features = useFeatureAdoption(days, true);
  const retention = useRetention(true);
  const funnel = useSignupFunnel(days, true);
  const topUsers = useTopUsers(days, true);

  if (!growth || growth.length === 0) return <p className="ts-center-note">Загрузка...</p>;

  const last = growth[growth.length - 1];
  const labels = growth.map((g) => dayLabel(g.day));
  const identityStart = growth.find((g) => g.dau !== null)?.day ?? null;
  const funnelTop = funnel?.[0]?.sessions ?? 0;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <div className="ts-card-panel">
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{last.dau ?? '—'}</div>
            <div className="desc">активных пользователей сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{last.wau ?? '—'}</div>
            <div className="desc">за неделю</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{last.mau ?? '—'}</div>
            <div className="desc">за месяц</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">
              {last.stickiness === null ? '—' : `${Math.round(last.stickiness * 100)}%`}
            </div>
            <div className="desc">залипание (DAU / MAU)</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{formatDuration(last.msP50)}</div>
            <div className="desc">медиана визита сегодня</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{last.visitors}</div>
            <div className="desc">всего посетителей сегодня</div>
          </div>
        </div>
      </div>

      <div className="ts-theme-btns" style={{ marginTop: 2 }}>
        {GROWTH_PERIODS.map((p) => (
          <button key={p} className={`ts-theme-btn${days === p ? ' on' : ''}`} onClick={() => setDays(p)}>
            {p} дней
          </button>
        ))}
      </div>

      <div className="ts-card-panel">
        <h2>Активные пользователи</h2>
        <div className="desc">
          Уникальные люди, а не браузеры: один человек с телефона и ноутбука считается один раз.
          {identityStart
            ? ` Учёт по пользователям ведётся с ${dayLabel(identityStart)}, раньше этой даты данных нет.`
            : ''}
        </div>
        <LineChart
          labels={labels}
          series={[
            { label: 'За день', color: 'var(--ts-blue)', values: growth.map((g) => g.dau) },
            { label: 'За неделю', color: 'var(--ts-violet)', values: growth.map((g) => g.wau) },
            { label: 'За месяц', color: 'var(--ts-cyan)', values: growth.map((g) => g.mau) }
          ]}
        />
      </div>

      <div className="ts-card-panel">
        <h2>Гости и зарегистрированные</h2>
        <div className="desc">
          Разрыв между линиями — это те, кто ходит по сайту, но не заводит аккаунт.
        </div>
        <LineChart
          labels={labels}
          series={[
            { label: 'Всего посетителей', color: 'var(--ts-violet)', values: growth.map((g) => g.visitors) },
            { label: 'Из них с аккаунтом', color: 'var(--ts-blue)', values: growth.map((g) => g.dau) }
          ]}
        />
      </div>

      <div className="ts-card-panel">
        <h2>Сколько времени проводят на сайте</h2>
        <div className="desc">
          Активное время одного визита: считается по «пульсу» раз в 25 секунд и только пока вкладка
          открыта и видима, так что открытая в фоне страница время не накручивает. Медиана честнее
          среднего — её не задирают единичные долгие визиты.
        </div>
        <LineChart
          labels={labels}
          series={[
            { label: 'Медиана', color: 'var(--ts-blue)', values: growth.map((g) => g.msP50) },
            { label: 'Среднее', color: 'var(--ts-violet)', values: growth.map((g) => g.msAvg) }
          ]}
          formatValue={(ms) => formatDuration(ms)}
        />
      </div>

      <div className="ts-card-panel">
        <h2>Возвращаются ли люди</h2>
        <div className="desc">
          Доля зарегистрировавшихся на той неделе, кто заходил снова в течение дня, недели и месяца
          после регистрации. Прочерк — срок ещё не прошёл.
        </div>
        {retention ? (
          <CohortGrid
            columns={RETENTION_COLUMNS}
            rows={retention.map((r) => ({
              label: weekLabel(r.cohortWeek),
              size: r.cohortSize,
              cells: [r.d1, r.d7, r.d30]
            }))}
          />
        ) : (
          <div className="desc">Загрузка...</div>
        )}
      </div>

      {features && <FeatureAdoptionCard features={features.filter((f) => f.group !== FUNNEL_GROUP)} />}

      <div className="ts-card-panel">
        <h2>Воронка регистрации</h2>
        <div className="desc">
          Считается по сессиям, а не по людям: на входе в воронку аккаунта ещё нет. Проценты — от
          первого шага.
        </div>
        <RankBars
          items={(funnel ?? []).map((step) => ({
            label: step.label,
            value: step.sessions,
            hint: funnelTop > 0 ? `${Math.round((step.sessions / funnelTop) * 100)}% от открывших вход` : undefined
          }))}
          formatValue={(n) => `${n}`}
          emptyNote="Пока никто не заходил на страницу входа за этот период."
        />
      </div>

      <div className="ts-card-panel">
        <h2>Самые активные пользователи</h2>
        {topUsers && topUsers.length > 0 ? (
          <div className="ts-rank-bars">
            {topUsers.map((u) => (
              <div className="ts-rank-row" key={u.userId}>
                <div className="ts-rank-head">
                  <Link className="ts-rank-label" to={`/users/${u.userId}`}>
                    @{u.username}
                  </Link>
                  <span className="ts-rank-value">{formatDuration(u.activeMs)}</span>
                </div>
                <div className="ts-rank-hint">
                  {u.daysActive} дн. активности · {u.visits} визитов · {u.featuresUsed} функций · был(а){' '}
                  {dayLabel(u.lastSeen)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="desc">Пока нет активности зарегистрированных пользователей за этот период.</div>
        )}
      </div>

      <DigestCard days={90} />
    </div>
  );
}

function TrafficTab() {
  const { onlineNow } = useTrafficOnline(true);
  const { summary } = useTrafficSummary(14, true);
  const pages = useTopPages(14, true);
  const searches = useSearchInsights(14, true);

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

      <div className="ts-card-panel">
        <h2>Популярные разделы</h2>
        <RankBars
          items={(pages ?? []).map((p) => ({
            label: p.path,
            value: p.views,
            hint: `${p.visitors} посетителей`
          }))}
          formatValue={(n) => `${n} просм.`}
          emptyNote="Пока нет просмотров страниц за этот период."
        />
      </div>

      <div className="ts-card-panel">
        <h2>Что ищут</h2>
        <div className="desc">
          Запросы, по которым ничего не нашлось, помечены отдельно — это прямая подсказка, каких
          мероприятий на сайте не хватает.
        </div>
        <RankBars
          items={(searches ?? []).map((s) => ({
            label: s.query,
            value: s.searches,
            hint: s.zeroResults > 0 ? `без результата: ${s.zeroResults}` : undefined
          }))}
          formatValue={(n) => `${n}`}
          emptyNote="Пока никто не искал за этот период."
        />
      </div>
    </div>
  );
}

function BarsCreditCard({ credit, onSaved }: { credit: BarsCredit | null; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(credit ? String(credit.toppedUpUsd) : '');
  const [date, setDate] = useState(credit?.toppedUpAt ?? new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    const value = Number(amount.replace(',', '.'));
    if (!Number.isFinite(value) || value < 0) {
      setError('Введите сумму пополнения в долларах');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await setBarsCredit({ toppedUpUsd: value, toppedUpAt: date });
      setEditing(false);
      onSaved();
    } catch {
      setError('Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  const percent = credit && credit.toppedUpUsd > 0
    ? Math.min(100, (credit.remainingUsd / credit.toppedUpUsd) * 100)
    : 0;
  const low = percent <= 20;

  return (
    <div className="ts-card-panel">
      <h2>Баланс Gemini (оценка)</h2>
      {credit && !editing ? (
        <>
          <div className="desc">
            ≈ ${credit.remainingUsd.toFixed(2)} из ${credit.toppedUpUsd.toFixed(2)} · потрачено с{' '}
            {credit.toppedUpAt}: ${credit.spentSinceUsd.toFixed(2)}
          </div>
          <div className="ts-usage-bar">
            <div className={`ts-usage-bar-fill${low ? ' warn' : ''}`} style={{ width: `${percent}%` }} />
          </div>
          <div className="desc" style={{ marginTop: 12 }}>
            Оценка по нашему подсчёту токенов, не реальный баланс Google. Настоящий — в AI Studio →
            Billing. Не учитывает эмбеддинги поисковых запросов и возможный free tier.
          </div>
          <button className="ts-theme-btn" style={{ marginTop: 12 }} onClick={() => setEditing(true)}>
            Изменить пополнение
          </button>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          <label className="desc">
            Сумма пополнения, $
            <input
              className="ts-input"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', marginTop: 4 }}
            />
          </label>
          <label className="desc">
            Дата пополнения
            <input
              className="ts-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', marginTop: 4 }}
            />
          </label>
          {error && <div className="desc" style={{ color: 'var(--ts-danger, #d33)' }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="ts-theme-btn on" onClick={save} disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
            {credit && (
              <button className="ts-theme-btn" onClick={() => setEditing(false)} disabled={saving}>
                Отмена
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BarsTab() {
  const { analytics, reload } = useBarsAnalytics(BARS_WINDOW_DAYS, true);

  if (!analytics) return <p className="ts-center-note">Загрузка...</p>;

  const { summary, tokenTotals, daily, costUsd, pricingConfigured, tools, topChats } = analytics;
  const totalTokens = tokenTotals.promptTokens + tokenTotals.outputTokens;

  return (
    <div className="ts-publish-col" style={{ marginTop: 20 }}>
      <BarsCreditCard credit={analytics.credit} onSaved={reload} />

      <div className="desc">Статистика ниже — за последние {BARS_WINDOW_DAYS} дней.</div>

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
      {tab === 'growth' && <GrowthTab />}
      {tab === 'traffic' && <TrafficTab />}
      {tab === 'bars' && <BarsTab />}
    </div>
  );
}
