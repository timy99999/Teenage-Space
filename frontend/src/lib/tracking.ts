import { api } from './api';

const SESSION_KEY = 'ts_session_id';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type LinkKind = 'registration' | 'instagram' | 'telegram' | 'extra_link' | 'news_link';

export function getSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // Private mode / storage blocked — fall back to a per-call id rather than throwing.
    return crypto.randomUUID();
  }
}

export function getDeviceType(): DeviceType {
  const coarsePointer = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;
  if (!coarsePointer) return 'desktop';
  return width >= 768 ? 'tablet' : 'mobile';
}

function base() {
  return { sessionId: getSessionId(), deviceType: getDeviceType() };
}

export function trackPageView(path: string, isLoggedIn: boolean) {
  api.post('/traffic/view', { ...base(), isLoggedIn, path }).catch(() => {});
}

export function trackCardView(targetType: 'event' | 'news', targetId: string, isLoggedIn: boolean) {
  api.post('/traffic/card-view', { ...base(), isLoggedIn, targetType, targetId }).catch(() => {});
}

export function trackLinkClick(
  linkKind: LinkKind,
  isLoggedIn: boolean,
  target?: { targetType: 'event' | 'news'; targetId: string }
) {
  api.post('/traffic/link-click', { ...base(), isLoggedIn, linkKind, ...target }).catch(() => {});
}

export function sendHeartbeat(isLoggedIn: boolean) {
  api.post('/traffic/heartbeat', { ...base(), isLoggedIn }).catch(() => {});
}
