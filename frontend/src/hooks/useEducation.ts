import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCached, getOrFetch } from '../lib/dataCache';
import type { MaterialItem } from '../types';

const TTL_MS = 60000;

interface EducationData {
  intro: string;
  items: MaterialItem[];
}

export function useEducation(track: string) {
  const cacheKey = `education/${track}`;
  const seed = getCached<EducationData>(cacheKey);
  const [items, setItems] = useState<MaterialItem[]>(() => seed?.items ?? []);
  const [intro, setIntro] = useState(() => seed?.intro ?? '');
  const [loading, setLoading] = useState(() => !seed);

  useEffect(() => {
    let cancelled = false;
    const cached = getCached<EducationData>(cacheKey);
    if (cached) {
      setIntro(cached.intro);
      setItems(cached.items);
      setLoading(false);
    } else {
      setLoading(true);
    }
    getOrFetch<EducationData>(cacheKey, () => api.get<EducationData>(`/education/${track}`), TTL_MS)
      .then((data) => {
        if (!cancelled) {
          setIntro(data.intro);
          setItems(data.items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled && !cached) {
          setIntro('');
          setItems([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return { intro, items, loading };
}

export function useArticle(id: string | undefined) {
  const cacheKey = id ? `article/${id}` : null;
  const [article, setArticle] = useState<MaterialItem | null>(() => (cacheKey ? getCached<MaterialItem>(cacheKey) : null));

  useEffect(() => {
    if (!id || !cacheKey) {
      setArticle(null);
      return;
    }
    let cancelled = false;
    const cached = getCached<MaterialItem>(cacheKey);
    if (cached) setArticle(cached);
    getOrFetch<MaterialItem>(cacheKey, () => api.get<MaterialItem>(`/articles/${id}`), TTL_MS)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled && !cached) setArticle(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return article;
}
