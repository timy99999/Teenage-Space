import type { NewsItem } from '../types';
import { fmtDate } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { useUI } from '../contexts/UIContext';

export function NewsCard({ item }: { item: NewsItem }) {
  const { flash } = useUI();
  const open = () => flash('Полная новость появится в следующей версии');

  return (
    <article className="ts-card">
      <button className="ts-card-img" onClick={open}>
        <EventPhoto src={item.imageUrl} alt={item.title} />
        <span className="ts-card-cat-badge">Новость</span>
      </button>
      <button className="ts-card-body" onClick={open}>
        <h3 className="ts-card-title">{item.title}</h3>
        <p className="ts-card-short">{item.short}</p>
        <div className="ts-card-meta">
          <span>{fmtDate(item.date)}</span>
        </div>
      </button>
      <div className="ts-card-foot" style={{ justifyContent: 'flex-end' }}>
        {item.linkUrl && (
          <a
            href={item.linkUrl}
            target="_blank"
            rel="noreferrer"
            className="ts-btn-outline small"
            onClick={(e) => e.stopPropagation()}
          >
            {item.linkTitle || 'Подробнее'}
          </a>
        )}
      </div>
    </article>
  );
}
