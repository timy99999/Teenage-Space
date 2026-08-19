import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { getCached, getOrFetch } from '../lib/dataCache';
import type { EventItem } from '../types';

const TTL_MS = 60000;

export interface EventFilters {
  scope: 'upcoming' | 'past' | 'all';
  category?: string;
  categories?: string[];
  themes?: string[];
  price?: 'free' | 'paid' | null;
  level?: 'local' | 'intl' | null;
  age?: string;
}

function buildQuery(filters: EventFilters): string {
  const params = new URLSearchParams();
  params.set('scope', filters.scope);
  if (filters.category) params.set('category', filters.category);
  if (filters.categories?.length) params.set('categories', filters.categories.join(','));
  if (filters.themes?.length) params.set('themes', filters.themes.join(','));
  if (filters.price) params.set('price', filters.price);
  if (filters.level) params.set('level', filters.level);
  if (filters.age) params.set('age', filters.age);
  return params.toString();
}

export function useEvents(filters: EventFilters) {
  const key = buildQuery(filters);
  const [events, setEvents] = useState<EventItem[]>(() => getCached<EventItem[]>(`events?${key}`) ?? []);
  const [loading, setLoading] = useState(() => !getCached<EventItem[]>(`events?${key}`));

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `events?${key}`;
    const cached = getCached<EventItem[]>(cacheKey);
    if (cached) {
      setEvents(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }
    getOrFetch<EventItem[]>(cacheKey, () => api.get<EventItem[]>(`/events?${key}`), TTL_MS)
      .then((data) => {
        if (!cancelled) {
          setEvents(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled && !cached) {
          setEvents([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { events, loading };
}

export function useEvent(id: string | null) {
  const cacheKey = id ? `event/${id}` : null;
  const [event, setEvent] = useState<EventItem | null>(() => (cacheKey ? getCached<EventItem>(cacheKey) : null));

  useEffect(() => {
    if (!id || !cacheKey) {
      setEvent(null);
      return;
    }
    let cancelled = false;
    const cached = getCached<EventItem>(cacheKey);
    if (cached) setEvent(cached);
    getOrFetch<EventItem>(cacheKey, () => api.get<EventItem>(`/events/${id}`), TTL_MS)
      .then((data) => {
        if (!cancelled) setEvent(data);
      })
      .catch(() => {
        if (!cancelled && !cached) setEvent(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return event;
}
