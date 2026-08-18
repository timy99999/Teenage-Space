import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { NewsItem } from '../types';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<NewsItem[]>('/news')
      .then((data) => {
        if (!cancelled) setNews(data);
      })
      .catch(() => {
        if (!cancelled) setNews([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { news, loading };
}
