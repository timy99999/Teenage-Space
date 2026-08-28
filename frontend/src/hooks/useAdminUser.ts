import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { AdminUserDetail } from '../types';

export function useAdminUser(id: string | undefined) {
  const { isSuperAdmin } = useAuth();
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!isSuperAdmin || !id) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await api.get<AdminUserDetail>(`/admin/users/${id}`).catch(() => null);
    setUser(data);
    setLoading(false);
  }, [isSuperAdmin, id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { user, loading, reload };
}
