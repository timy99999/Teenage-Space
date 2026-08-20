import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { Analytics } from '../types';

export function useAdminAnalytics() {
  const { isAdmin } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const reload = useCallback(async () => {
    if (!isAdmin) {
      setAnalytics(null);
      return;
    }
    const data = await api.get<Analytics>('/admin/analytics').catch(() => null);
    setAnalytics(data);
  }, [isAdmin]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { analytics, reload };
}
