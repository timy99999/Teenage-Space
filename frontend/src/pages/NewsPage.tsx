import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNewsItem } from '../hooks/useNews';
import { useAuth } from '../contexts/AuthContext';
import { NewsDetails } from '../components/NewsDetails';
import { Seo } from '../components/Seo';
import { trackCardView } from '../lib/tracking';

/** Standalone, directly-linkable page for one news item — the crawlable/shareable
 *  counterpart to the `?news=` modal opened from the grid (NewsModal). */
export function NewsPage() {
  const { id } = useParams();
  const item = useNewsItem(id ?? null);
  const { session } = useAuth();
  const trackedId = useRef<string | null>(null);

  useEffect(() => {
    if (!item || trackedId.current === item.id) return;
    trackedId.current = item.id;
    trackCardView('news', item.id, !!session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  if (!item) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.short,
    image: item.imageUrl ?? undefined,
    datePublished: item.date
  };

  return (
    <div className="ts-article-page">
      <Seo
        title={item.title}
        description={item.short}
        path={`/news/${item.id}`}
        image={item.imageUrl ?? undefined}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="ts-modal ts-modal-standalone">
        <NewsDetails item={item} loggedIn={!!session} />
      </div>
    </div>
  );
}
