import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCached, getOrFetch } from '../lib/dataCache';
import type { NewsItem } from '../types';

const TTL_MS = 60000;
const CACHE_KEY = 'news';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(() => getCached<NewsItem[]>(CACHE_KEY) ?? []);
  const [loading, setLoading] = useState(() => !getCached<NewsItem[]>(CACHE_KEY));

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

  return { news, loading };
}
