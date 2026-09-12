import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { EventDetails } from './EventDetails';
import { trackCardView } from '../lib/tracking';

export function EventModal() {
  const [params, setParams] = useSearchParams();
  const eventId = params.get('event');
  const event = useEvent(eventId);
  const { favorites, toggle } = useFavorites();
  const { session } = useAuth();
  const trackedId = useRef<string | null>(null);

  useEffect(() => {
    if (!event || trackedId.current === event.id) return;
    trackedId.current = event.id;
    trackCardView('event', event.id, !!session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id]);

  if (!eventId || !event) return null;

  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('event');
    setParams(next, { replace: true });
  };

  const fav = favorites.has(event.id);

  return (
    <div className="ts-modal-overlay" onClick={close}>
      <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ts-modal-close" onClick={close}>
          ←
        </button>
        <EventDetails event={event} fav={fav} onToggleFav={() => toggle(event.id)} loggedIn={!!session} />
      </div>
    </div>
  );
}
