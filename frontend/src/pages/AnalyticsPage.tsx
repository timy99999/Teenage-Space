import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCapacity } from '../hooks/useCapacity';
import { useTrafficSummary, useTrafficOnline } from '../hooks/useTraffic';
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
  { key: 'traffic', label: 'Посещаемость' }
] as const;

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
      {tab === 'traffic' && <TrafficTab />}
    </div>
  );
}
