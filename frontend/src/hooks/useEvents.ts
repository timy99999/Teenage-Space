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
  /** Free-text search — catalog only. */
  q?: string;
  sort?: 'new' | 'deadline';
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
  // Mirror the backend's @MaxLength(100) so an over-long term can't 400 the request.
  const q = filters.q?.trim().slice(0, 100);
  if (q) params.set('q', q);
  if (filters.sort && filters.sort !== 'new') params.set('sort', filters.sort);
  return params.toString();
}

export function useEvents(filters: EventFilters) {
  const key = buildQuery(filters);
  // Search results are volatile and query-specific — keep them out of the persistent
  // (localStorage) cache so it doesn't fill up with one-off queries. Plain catalog
  // views still get the stale-while-error persistence.
  const isSearch = !!filters.q?.trim();
  const [events, setEvents] = useState<EventItem[]>(() =>
    isSearch ? [] : getCached<EventItem[]>(`events?${key}`) ?? []
  );
  const [loading, setLoading] = useState(() => isSearch || !getCached<EventItem[]>(`events?${key}`));

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `events?${key}`;
    const cached = isSearch ? null : getCached<EventItem[]>(cacheKey);
    if (cached) {
      setEvents(cached);
      setLoading(false);
    } else {
      setLoading(true);
      // In search mode, drop the previous query's results immediately so the grid
      // never flashes a stale/unfiltered list while the new request is in flight.
      if (isSearch) setEvents([]);
    }
    const fetcher = () => api.get<EventItem[]>(`/events?${key}`);
    // A first-time guest has no cached copy to fall back to (getOrFetch's
    // stale-while-error only helps once something has been fetched before), so a
    // single transient blip — a cold Railway container, a dropped request — would
    // otherwise render as "ничего нет" with no error and no way to recover short of
    // a manual reload. A couple of quick retries covers that without masking a real
    // outage (which still ends up empty after these run out).
    function withRetries(retriesLeft: number): Promise<EventItem[]> {
      const attempt = isSearch ? fetcher() : getOrFetch<EventItem[]>(cacheKey, fetcher, TTL_MS);
      if (retriesLeft <= 0) return attempt;
      return attempt.catch(
        () => new Promise<EventItem[]>((resolve, reject) => {
          setTimeout(() => withRetries(retriesLeft - 1).then(resolve, reject), 1500);
        })
      );
    }
    const request = withRetries(2);
    request
      .then((data) => {
        // A superseded request (key changed) has cancelled === true — its result is dropped,
        // so responses can't land out of order.
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
  }, [key, isSearch]);

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
