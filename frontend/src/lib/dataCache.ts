interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
// localStorage (not sessionStorage) so the last-known catalogue survives closing the tab
// and is there on the next cold visit even if the backend is down right then. The -v2
// suffix retires every entry written under the old sessionStorage scheme.
const STORAGE_PREFIX = 'ts-cache-v2:';
// Past this age a persisted entry is treated as absent — too old to show even as a
// last-resort fallback during an outage.
const MAX_STALE_MS = 24 * 60 * 60 * 1000;

function readFromStore<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.fetchedAt > MAX_STALE_MS) {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function writeToStore<T>(key: string, entry: CacheEntry<T>): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) - in-memory cache still works
  }
}

function getEntry<T>(key: string): CacheEntry<T> | null {
  const hit = store.get(key) as CacheEntry<T> | undefined;
  if (hit) return Date.now() - hit.fetchedAt > MAX_STALE_MS ? null : hit;
  const fromStore = readFromStore<T>(key);
  if (fromStore) store.set(key, fromStore);
  return fromStore;
}

export function getCached<T>(key: string): T | null {
  const hit = getEntry<T>(key);
  return hit ? hit.data : null;
}

export function isFresh(key: string, ttlMs: number): boolean {
  const hit = getEntry(key);
  return !!hit && Date.now() - hit.fetchedAt < ttlMs;
}

/**
 * Fresh cache (within ttlMs) → returned as-is, no request. Otherwise the fetcher runs;
 * if it fails we fall back to whatever cached copy we still have (stale-while-error), so a
 * backend blip never blanks the catalogue. Only a failure with no usable cache propagates.
 */
export function getOrFetch<T>(key: string, fetcher: () => Promise<T>, ttlMs = 60000): Promise<T> {
  if (isFresh(key, ttlMs)) {
    return Promise.resolve(getCached<T>(key) as T);
  }
  return fetcher().then(
    (data) => {
      const entry = { data, fetchedAt: Date.now() };
      store.set(key, entry);
      writeToStore(key, entry);
      return data;
    },
    (err) => {
      const stale = getCached<T>(key);
      if (stale !== null) return stale;
      throw err;
    }
  );
}
