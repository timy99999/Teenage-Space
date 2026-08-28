import { supabase } from './supabase';

const BASE = import.meta.env.VITE_API_URL ?? '/api';

/** Fired when the API is unreachable or returning server errors — a component near the
 *  root listens and shows one toast. Debounced so a burst of failures is one nudge. */
export const NET_TROUBLE_EVENT = 'ts:net-trouble';
let lastTroubleReport = 0;
function reportNetworkTrouble(): void {
  const now = Date.now();
  if (now - lastTroubleReport < 10000) return;
  lastTroubleReport = now;
  window.dispatchEvent(new CustomEvent(NET_TROUBLE_EVENT));
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const auth = await authHeader();
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...auth,
        ...(init?.headers ?? {})
      }
    });
  } catch (err) {
    // fetch rejects only on a network-level failure (server down, DNS, offline, CORS).
    reportNetworkTrouble();
    throw err instanceof Error ? err : new Error('Нет соединения с сервером');
  }
  if (!res.ok) {
    // 5xx / 429 means the backend itself is struggling; 4xx is a normal handled outcome.
    if (res.status >= 500 || res.status === 429) reportNetworkTrouble();
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message ?? `Ошибка запроса: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, opts?: { noCache?: boolean }) =>
    request<T>(path, { method: 'GET', cache: opts?.noCache ? 'no-store' : undefined }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' })
};
