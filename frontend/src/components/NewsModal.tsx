import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { useAuth } from '../contexts/AuthContext';
import { NewsDetails } from './NewsDetails';
import { trackCardView } from '../lib/tracking';

export function NewsModal() {
  const [params, setParams] = useSearchParams();
  const newsId = params.get('news');
  const { news } = useNews();
  const item = newsId ? news.find((n) => n.id === newsId) : null;
  const { session } = useAuth();
  const trackedId = useRef<string | null>(null);

  useEffect(() => {
    if (!item || trackedId.current === item.id) return;
    trackedId.current = item.id;
    trackCardView('news', item.id, !!session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

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
        <NewsDetails item={item} loggedIn={!!session} />
      </div>
    </div>
  );
}
