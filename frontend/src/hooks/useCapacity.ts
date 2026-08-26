import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { Capacity } from '../types';

export function useCapacity() {
  const { isSuperAdmin } = useAuth();
  const [capacity, setCapacity] = useState<Capacity | null>(null);

  const reload = useCallback(async () => {
    if (!isSuperAdmin) {
      setCapacity(null);
      return;
    }
    const data = await api.get<Capacity>('/admin/capacity').catch(() => null);
    setCapacity(data);
  }, [isSuperAdmin]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { capacity, reload };
}
