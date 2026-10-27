import { api } from './api';

const SESSION_KEY = 'ts_session_id';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type LinkKind = 'registration' | 'instagram' | 'telegram' | 'extra_link' | 'news_link';

/** Mirrors traffic_feature_catalog. The catalog's FK is what rejects an unknown
 *  key at write time — and ingestion swallows errors, so a typo would silently
 *  drop the event. This union is the compile-time guard against that; keep it in
 *  step with the catalog whenever a feature is added there. */
export type FeatureKey =
  | 'favorite_add'
  | 'favorite_remove'
  | 'rating_submit'
  | 'share_click'
  | 'search_query'
  | 'search_zero_result'
  | 'filter_apply'
  | 'filter_reset'
  | 'track_open'
  | 'article_open'
  | 'event_submit_open'
  | 'event_submit_success'
  | 'profile_edit'
  | 'avatar_upload'
  | 'telegram_link_open'
  | 'theme_toggle'
  | 'notifications_toggle'
  | 'logout'
  | 'account_delete'
  | 'auth_open'
  | 'auth_login_submit'
  | 'auth_login_success'
  | 'auth_google_click'
  | 'auth_reg_step1'
  | 'auth_reg_step2'
  | 'auth_reg_step3'
  | 'auth_reg_success'
  | 'auth_forgot_start'
  | 'auth_forgot_success';

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

/** Records that someone used a feature. No isLoggedIn argument: the backend reads
 *  identity from the bearer token `api` already attaches, so call sites don't need
 *  access to the session. Fire-and-forget, like the rest of this module. */
export function trackFeature(feature: FeatureKey, detail?: string) {
  api.post('/traffic/feature', { ...base(), feature, detail }).catch(() => {});
}
