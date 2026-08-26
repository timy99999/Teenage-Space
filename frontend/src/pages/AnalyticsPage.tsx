import { useAuth } from '../contexts/AuthContext';
import { useCapacity } from '../hooks/useCapacity';

const BUCKET_LABELS: Record<string, string> = {
  avatars: 'Аватары',
  posts: 'Картинки постов'
};

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

export function AnalyticsPage() {
  const { profile, isSuperAdmin } = useAuth();
  const { capacity } = useCapacity();

  if (profile && !isSuperAdmin) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Аналитика</h1>
        <p className="ts-center-note">Доступ только для главного администратора.</p>
      </div>
    );
  }

  if (!capacity) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Аналитика</h1>
        <p className="ts-center-note">Загрузка...</p>
      </div>
    );
  }

  const { database, storage, capacityEstimate } = capacity;

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Аналитика</h1>

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
    </div>
  );
}
