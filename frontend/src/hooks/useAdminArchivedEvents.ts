import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { EventItem } from '../types';

export function useAdminArchivedEvents() {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);

  const reload = useCallback(async () => {
    if (!isAdmin) {
      setEvents([]);
      return;
    }
    const data = await api.get<EventItem[]>('/admin/events/archived').catch(() => []);
    setEvents(data);
  }, [isAdmin]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { events, reload };
}
