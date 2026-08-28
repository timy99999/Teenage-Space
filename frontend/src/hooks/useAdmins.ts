import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { AdminUser } from '../types';

export function useAdmins() {
  const { isSuperAdmin } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  const reload = useCallback(async () => {
    if (!isSuperAdmin) {
      setAdmins([]);
      return;
    }
    const data = await api.get<AdminUser[]>('/admin/users/admins').catch(() => []);
    setAdmins(data);
  }, [isSuperAdmin]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { admins, reload };
}
