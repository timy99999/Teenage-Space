import { usePublishInfo, type PublisherInfo } from '../hooks/usePublishInfo';

function fmtWhen(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function who(p: PublisherInfo | null): string {
  if (!p || (!p.username && !p.email)) return 'неизвестно';
  return p.username ? (p.email ? `${p.username} · ${p.email}` : p.username) : (p.email as string);
}

/** Footer note at the bottom of an opened card: who published it and when — and,
 *  for an event that came from a user's submission, who applied and when.
 *  Renders nothing for anyone but the super admin (see usePublishInfo). */
export function PublishInfo({ kind, id }: { kind: 'event' | 'news'; id: string }) {
  const info = usePublishInfo(kind, id);
  if (!info) return null;

  return (
    <div className="ts-publish-info">
      {info.submission && (
        <div>
          Заявку подал: {who(info.submission.submittedBy)} · {fmtWhen(info.submission.submittedAt)}
        </div>
      )}
      <div>
        Опубликовал: {who(info.publishedBy)} · {fmtWhen(info.publishedAt)}
      </div>
    </div>
  );
}
