import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { CardViewCount, TrafficSummary } from '../types';

const SUMMARY_INTERVAL_MS = 30000;
const ONLINE_INTERVAL_MS = 12000;
const CARD_VIEWS_INTERVAL_MS = 60000;

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
