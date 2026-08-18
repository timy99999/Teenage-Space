import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type { Submission } from '../types';

export function useSubmissions() {
  const { session } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const reload = useCallback(async () => {
    if (!session) {
      setSubmissions([]);
      return;
    }
    const data = await api.get<Submission[]>('/submissions').catch(() => []);
    setSubmissions(data);
  }, [session]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { submissions, reload };
}
