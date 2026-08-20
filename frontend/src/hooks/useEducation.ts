import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCached, getOrFetch } from '../lib/dataCache';
import type { EducationTrack, MaterialItem } from '../types';

const TTL_MS = 60000;

interface EducationData {
  id: string;
  title: string;
  intro: string;
  items: MaterialItem[];
}

export function useEducation(track: string) {
  const cacheKey = `education/${track}`;
  const seed = getCached<EducationData>(cacheKey);
  const [title, setTitle] = useState(() => seed?.title ?? '');
  const [items, setItems] = useState<MaterialItem[]>(() => seed?.items ?? []);
  const [intro, setIntro] = useState(() => seed?.intro ?? '');
  const [loading, setLoading] = useState(() => !seed);

  const reload = useCallback(async () => {
    const data = await api.get<EducationData>(`/education/${track}`, { noCache: true }).catch(() => null);
    if (data) {
      setTitle(data.title);
      setIntro(data.intro);
      setItems(data.items);
    }
  }, [track]);

  useEffect(() => {
    let cancelled = false;
    const cached = getCached<EducationData>(cacheKey);
    if (cached) {
      setTitle(cached.title);
      setIntro(cached.intro);
      setItems(cached.items);
      setLoading(false);
    } else {
      setLoading(true);
    }
    getOrFetch<EducationData>(cacheKey, () => api.get<EducationData>(`/education/${track}`), TTL_MS)
      .then((data) => {
        if (!cancelled) {
          setTitle(data.title);
          setIntro(data.intro);
          setItems(data.items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled && !cached) {
          setTitle('');
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

  return { title, intro, items, loading, reload };
}

export function useEducationTracks() {
  const cacheKey = 'education/tracks';
  const [tracks, setTracks] = useState<EducationTrack[]>(() => getCached<EducationTrack[]>(cacheKey) ?? []);

  const reload = useCallback(async () => {
    const data = await api.get<EducationTrack[]>('/education/tracks', { noCache: true }).catch(() => []);
    setTracks(data);
  }, []);

  useEffect(() => {
    const cached = getCached<EducationTrack[]>(cacheKey);
    if (cached) setTracks(cached);
    getOrFetch<EducationTrack[]>(cacheKey, () => api.get<EducationTrack[]>('/education/tracks'), TTL_MS)
      .then(setTracks)
      .catch(() => {
        if (!cached) setTracks([]);
      });
  }, []);

  return { tracks, reload };
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
