import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { AdminUser } from '../types';

export function useAdminUsers() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);

  const reload = useCallback(async () => {
    if (!isAdmin) {
      setUsers([]);
      return;
    }
    const data = await api.get<AdminUser[]>('/admin/users').catch(() => []);
    setUsers(data);
  }, [isAdmin]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { users, reload };
}
