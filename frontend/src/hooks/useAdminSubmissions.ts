import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { AdminSubmission, SubmissionStatus } from '../types';

export function useAdminSubmissions(status?: SubmissionStatus) {
  const { isAdmin } = useAuth();
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);

  const reload = useCallback(async () => {
    if (!isAdmin) {
      setSubmissions([]);
      return;
    }
    const query = status ? `?status=${status}` : '';
    const data = await api.get<AdminSubmission[]>(`/admin/submissions${query}`).catch(() => []);
    setSubmissions(data);
  }, [isAdmin, status]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { submissions, reload };
}
