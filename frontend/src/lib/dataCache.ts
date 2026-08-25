interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const STORAGE_PREFIX = 'ts-cache:';

function readFromSession<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as CacheEntry<T>) : null;
  } catch {
    return null;
  }
}

function writeToSession<T>(key: string, entry: CacheEntry<T>): void {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // sessionStorage unavailable (private mode, quota, etc.) - in-memory cache still works
  }
}

function getEntry<T>(key: string): CacheEntry<T> | null {
  const hit = store.get(key) as CacheEntry<T> | undefined;
  if (hit) return hit;
  const fromSession = readFromSession<T>(key);
  if (fromSession) store.set(key, fromSession);
  return fromSession;
}

export function getCached<T>(key: string): T | null {
  const hit = getEntry<T>(key);
  return hit ? hit.data : null;
}

export function isFresh(key: string, ttlMs: number): boolean {
  const hit = getEntry(key);
  return !!hit && Date.now() - hit.fetchedAt < ttlMs;
}

export function getOrFetch<T>(key: string, fetcher: () => Promise<T>, ttlMs = 60000): Promise<T> {
  if (isFresh(key, ttlMs)) {
    return Promise.resolve(getCached<T>(key) as T);
  }
  return fetcher().then((data) => {
    const entry = { data, fetchedAt: Date.now() };
    store.set(key, entry);
    writeToSession(key, entry);
    return data;
  });
}
