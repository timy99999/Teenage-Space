import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { BarsAnalytics, BarsChatRow, BarsMessage } from '../types';

const CHATS_INTERVAL_MS = 30000;

/** Recent Барс conversations for the QA page. Super-admin only. */
export function useBarsChats(days: number) {
  const { isSuperAdmin } = useAuth();
  const [chats, setChats] = useState<BarsChatRow[] | null>(null);

  const reload = useCallback(async () => {
    if (!isSuperAdmin) {
      setChats(null);
      return;
    }
    const data = await api
      .get<BarsChatRow[]>(`/admin/bars/chats?days=${days}`, { noCache: true })
      .catch(() => null);
    setChats(data);
  }, [isSuperAdmin, days]);

  useEffect(() => {
    if (!isSuperAdmin) {
      setChats(null);
      return;
    }
    reload();
    const interval = window.setInterval(reload, CHATS_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [isSuperAdmin, reload]);

  return { chats, reload };
}

/** Full transcript of one chat (within the retention window). */
export function useBarsChat(chatId: string | null) {
  const { isSuperAdmin } = useAuth();
  const [messages, setMessages] = useState<BarsMessage[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSuperAdmin || !chatId) {
      setMessages(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    api
      .get<BarsMessage[]>(`/admin/bars/chats/${chatId}/messages`, { noCache: true })
      .then((data) => {
        if (!cancelled) setMessages(data);
      })
      .catch(() => {
        if (!cancelled) setMessages(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isSuperAdmin, chatId]);

  return { messages, loading };
}

/** Aggregate usage + token spend for the Analytics "Барс" tab. */
export function useBarsAnalytics(days: number, enabled: boolean) {
  const { isSuperAdmin } = useAuth();
  const [analytics, setAnalytics] = useState<BarsAnalytics | null>(null);
  const active = enabled && isSuperAdmin;

  const reload = useCallback(async () => {
    if (!active) return;
    const data = await api
      .get<BarsAnalytics>(`/admin/bars/analytics?days=${days}`, { noCache: true })
      .catch(() => null);
    setAnalytics(data);
  }, [active, days]);

  useEffect(() => {
    if (!active) {
      setAnalytics(null);
      return;
    }
    reload();
  }, [active, reload]);

  return { analytics, reload };
}
