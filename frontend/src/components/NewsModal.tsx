import { useSearchParams } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { fmtDate } from '../data/constants';
import { EventPhoto } from './EventPhoto';

export function NewsModal() {
  const [params, setParams] = useSearchParams();
  const newsId = params.get('news');
  const { news } = useNews();
  const item = newsId ? news.find((n) => n.id === newsId) : null;

  if (!newsId || !item) return null;

  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('news');
    setParams(next, { replace: true });
  };

  return (
    <div className="ts-modal-overlay" onClick={close}>
      <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ts-modal-close" onClick={close}>
          ←
        </button>
        <div className="ts-modal-grid">
          <div className="ts-modal-img">
            <EventPhoto src={item.imageUrl} alt={item.title} />
          </div>
          <div className="ts-modal-body">
            <div className="ts-modal-cat">Новость</div>
            <h2 className="ts-modal-title">{item.title}</h2>
            <div className="ts-modal-field-label">{fmtDate(item.date)}</div>
            <p className="ts-modal-desc">{item.short}</p>
            {item.linkUrl && (
              <div className="ts-modal-actions">
                <a href={item.linkUrl} target="_blank" rel="noreferrer" className="ts-pill-link">
                  {item.linkTitle || 'Подробнее'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
