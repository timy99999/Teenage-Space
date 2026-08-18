import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

export function useFavorites() {
  const { session } = useAuth();
  const { flash } = useUI();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const reload = useCallback(async () => {
    if (!session) {
      setFavorites(new Set());
      return;
    }
    const ids = await api.get<string[]>('/favorites').catch(() => []);
    setFavorites(new Set(ids));
  }, [session]);

  useEffect(() => {
    reload();
  }, [reload]);

  const toggle = useCallback(
    async (eventId: string) => {
      if (!session) {
        flash('Войдите или создайте аккаунт, чтобы сохранять мероприятия');
        return;
      }
      const wasOn = favorites.has(eventId);
      setFavorites((prev) => {
        const next = new Set(prev);
        if (wasOn) next.delete(eventId);
        else next.add(eventId);
        return next;
      });
      try {
        await api.post(`/favorites/${eventId}`);
      } catch {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (wasOn) next.add(eventId);
          else next.delete(eventId);
          return next;
        });
      }
    },
    [favorites, session, flash]
  );

  return { favorites, toggle, reload };
}
