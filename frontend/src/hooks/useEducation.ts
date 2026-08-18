import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { MaterialItem } from '../types';

export function useEducation(track: string) {
  const [items, setItems] = useState<MaterialItem[]>([]);
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get<{ intro: string; items: MaterialItem[] }>(`/education/${track}`)
      .then((data) => {
        if (!cancelled) {
          setIntro(data.intro);
          setItems(data.items);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIntro('');
          setItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [track]);

  return { intro, items, loading };
}

export function useArticle(id: string | undefined) {
  const [article, setArticle] = useState<MaterialItem | null>(null);

  useEffect(() => {
    if (!id) {
      setArticle(null);
      return;
    }
    let cancelled = false;
    api
      .get<MaterialItem>(`/articles/${id}`)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled) setArticle(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return article;
}
