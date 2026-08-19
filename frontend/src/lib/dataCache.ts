interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const hit = store.get(key);
  return hit ? (hit.data as T) : null;
}

export function isFresh(key: string, ttlMs: number): boolean {
  const hit = store.get(key);
  return !!hit && Date.now() - hit.fetchedAt < ttlMs;
}

export function getOrFetch<T>(key: string, fetcher: () => Promise<T>, ttlMs = 60000): Promise<T> {
  if (isFresh(key, ttlMs)) {
    return Promise.resolve(getCached<T>(key) as T);
  }
  return fetcher().then((data) => {
    store.set(key, { data, fetchedAt: Date.now() });
    return data;
  });
}
