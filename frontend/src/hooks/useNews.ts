import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCached, getOrFetch } from '../lib/dataCache';
import type { NewsItem } from '../types';

const TTL_MS = 60000;
const CACHE_KEY = 'news';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(() => getCached<NewsItem[]>(CACHE_KEY) ?? []);
  const [loading, setLoading] = useState(() => !getCached<NewsItem[]>(CACHE_KEY));

  const reload = useCallback(async () => {
    const data = await api.get<NewsItem[]>('/news', { noCache: true }).catch(() => []);
    setNews(data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cached = getCached<NewsItem[]>(CACHE_KEY);
    if (cached) {
      setNews(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }
    getOrFetch<NewsItem[]>(CACHE_KEY, () => api.get<NewsItem[]>('/news'), TTL_MS)
      .then((data) => {
        if (!cancelled) {
          setNews(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled && !cached) {
          setNews([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { news, loading, reload };
}

export function useNewsItem(id: string | null) {
  const cacheKey = id ? `news/${id}` : null;
  const [item, setItem] = useState<NewsItem | null>(() => (cacheKey ? getCached<NewsItem>(cacheKey) : null));

  useEffect(() => {
    if (!id || !cacheKey) {
      setItem(null);
      return;
    }
    let cancelled = false;
    const cached = getCached<NewsItem>(cacheKey);
    if (cached) setItem(cached);
    getOrFetch<NewsItem>(cacheKey, () => api.get<NewsItem>(`/news/${id}`), TTL_MS)
      .then((data) => {
        if (!cancelled) setItem(data);
      })
      .catch(() => {
        if (!cancelled && !cached) setItem(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return item;
}
