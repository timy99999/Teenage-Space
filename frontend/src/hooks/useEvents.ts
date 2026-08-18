import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { EventItem } from '../types';

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
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const key = buildQuery(filters);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get<EventItem[]>(`/events?${key}`)
      .then((data) => {
        if (!cancelled) setEvents(data);
      })
      .catch(() => {
        if (!cancelled) setEvents([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { events, loading };
}

export function useEvent(id: string | null) {
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (!id) {
      setEvent(null);
      return;
    }
    let cancelled = false;
    api
      .get<EventItem>(`/events/${id}`)
      .then((data) => {
        if (!cancelled) setEvent(data);
      })
      .catch(() => {
        if (!cancelled) setEvent(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return event;
}
