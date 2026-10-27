import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type {
  CardViewCount,
  FeatureAdoption,
  FunnelStep,
  GrowthPoint,
  RetentionCohort,
  SearchInsight,
  TopPage,
  TopUser,
  TrafficSummary,
  UserActivity
} from '../types';

const SUMMARY_INTERVAL_MS = 30000;
const ONLINE_INTERVAL_MS = 12000;
const CARD_VIEWS_INTERVAL_MS = 60000;
// The growth aggregates move by the day, not by the second, and some of them scan
// a 90-day window — no reason to poll them as hard as the live counters.
const SLOW_INTERVAL_MS = 60000;

export function cardViewKey(targetType: string, targetId: string): string {
  return `${targetType}:${targetId}`;
}

/** Unique-view count per card (event/news), keyed by `cardViewKey(targetType, targetId)`. Super-admin only — used to badge cards across the site, not just the Analytics page. */
export function useCardViewCounts() {
  const { isSuperAdmin } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isSuperAdmin) {
      setCounts({});
      return;
    }
    let cancelled = false;
    const reload = async () => {
      const data = await api.get<CardViewCount[]>('/admin/traffic/card-views', { noCache: true }).catch(() => null);
      if (cancelled || !data) return;
      const map: Record<string, number> = {};
      for (const row of data) map[cardViewKey(row.targetType, row.targetId)] = row.uniqueViews;
      setCounts(map);
    };
    reload();
    const interval = window.setInterval(reload, CARD_VIEWS_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isSuperAdmin]);

  return counts;
}

export function useTrafficSummary(days: number, enabled: boolean) {
  const { isSuperAdmin } = useAuth();
  const [summary, setSummary] = useState<TrafficSummary | null>(null);
  const active = enabled && isSuperAdmin;

  const reload = useCallback(async () => {
    if (!active) return;
    const data = await api.get<TrafficSummary>(`/admin/traffic/summary?days=${days}`, { noCache: true }).catch(() => null);
    setSummary(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, days]);

  useEffect(() => {
    if (!active) {
      setSummary(null);
      return;
    }
    reload();
    const interval = window.setInterval(reload, SUMMARY_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [active, reload]);

  return { summary, reload };
}

/** Every panel on the Рост tab reads the same way: super-admin only, fetched on
 *  mount and refreshed slowly, null until it arrives. */
function useSlowAdminData<T>(path: string, enabled: boolean) {
  const { isSuperAdmin } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const active = enabled && isSuperAdmin;

  useEffect(() => {
    if (!active) {
      setData(null);
      return;
    }
    let cancelled = false;
    const reload = async () => {
      const res = await api.get<T>(path, { noCache: true }).catch(() => null);
      if (!cancelled && res) setData(res);
    };
    reload();
    const interval = window.setInterval(reload, SLOW_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [active, path]);

  return data;
}

export function useGrowth(days: number, enabled: boolean) {
  return useSlowAdminData<GrowthPoint[]>(`/admin/traffic/growth?days=${days}`, enabled);
}

export function useFeatureAdoption(days: number, enabled: boolean) {
  return useSlowAdminData<FeatureAdoption[]>(`/admin/traffic/features?days=${days}`, enabled);
}

export function useRetention(enabled: boolean) {
  return useSlowAdminData<RetentionCohort[]>('/admin/traffic/retention', enabled);
}

export function useTopUsers(days: number, enabled: boolean) {
  return useSlowAdminData<TopUser[]>(`/admin/traffic/top-users?days=${days}`, enabled);
}

export function useSignupFunnel(days: number, enabled: boolean) {
  return useSlowAdminData<FunnelStep[]>(`/admin/traffic/funnel?days=${days}`, enabled);
}

export function useSearchInsights(days: number, enabled: boolean) {
  return useSlowAdminData<SearchInsight[]>(`/admin/traffic/search?days=${days}`, enabled);
}

export function useTopPages(days: number, enabled: boolean) {
  return useSlowAdminData<TopPage[]>(`/admin/traffic/pages?days=${days}`, enabled);
}

export function useUserActivity(userId: string | undefined, enabled: boolean) {
  return useSlowAdminData<UserActivity>(`/admin/traffic/user/${userId ?? ''}`, enabled && !!userId);
}

/** On demand, not polled: this is the "copy a report for Claude" button. */
export function fetchAnalyticsDigest(days = 90) {
  return api.get<unknown>(`/admin/traffic/digest?days=${days}`, { noCache: true });
}

export function useTrafficOnline(enabled: boolean) {
  const { isSuperAdmin } = useAuth();
  const [onlineNow, setOnlineNow] = useState<number | null>(null);
  const active = enabled && isSuperAdmin;

  useEffect(() => {
    if (!active) {
      setOnlineNow(null);
      return;
    }
    let cancelled = false;
    const reload = async () => {
      const data = await api.get<{ onlineNow: number }>('/admin/traffic/online', { noCache: true }).catch(() => null);
      if (!cancelled && data) setOnlineNow(data.onlineNow);
    };
    reload();
    const interval = window.setInterval(reload, ONLINE_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [active]);

  return { onlineNow };
}
