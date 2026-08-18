import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

export function useRatings() {
  const { session } = useAuth();
  const { flash } = useUI();
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const reload = useCallback(async () => {
    if (!session) {
      setRatings({});
      return;
    }
    const r = await api.get<Record<string, number>>('/ratings').catch(() => ({}));
    setRatings(r);
  }, [session]);

  useEffect(() => {
    reload();
  }, [reload]);

  const rate = useCallback(
    async (eventId: string, value: number) => {
      if (!session) {
        flash('Войдите, чтобы оценить мероприятие');
        return;
      }
      if (ratings[eventId]) {
        flash('Вы уже голосовали за это мероприятие');
        return;
      }
      setRatings((prev) => ({ ...prev, [eventId]: value }));
      try {
        await api.post(`/ratings/${eventId}`, { value });
      } catch {
        setRatings((prev) => {
          const next = { ...prev };
          delete next[eventId];
          return next;
        });
      }
    },
    [ratings, session, flash]
  );

  return { ratings, rate };
}
