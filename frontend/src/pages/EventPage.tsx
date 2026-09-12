import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { EventDetails } from '../components/EventDetails';
import { Seo } from '../components/Seo';
import { trackCardView } from '../lib/tracking';
import { P1_ENABLED } from '../config/featureFlags';

/** Standalone, directly-linkable page for one event — the crawlable/shareable
 *  counterpart to the `?event=` modal opened from the grid (EventModal). Same
 *  data, same EventDetails render, just addressed by its own URL. */
export function EventPage() {
  const { id } = useParams();
  const event = useEvent(id ?? null);
  const { favorites, toggle } = useFavorites();
  const { session } = useAuth();
  const trackedId = useRef<string | null>(null);

  useEffect(() => {
    if (!event || trackedId.current === event.id) return;
    trackedId.current = event.id;
    trackCardView('event', event.id, !!session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id]);

  if (!event) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: event.imageUrl ?? undefined,
    startDate: event.eventDate ?? undefined,
    endDate: event.eventDateEnd ?? event.eventDate ?? undefined,
    ...(P1_ENABLED
      ? {
          eventAttendanceMode:
            event.attendanceMode === 'online'
              ? 'https://schema.org/OnlineEventAttendanceMode'
              : event.attendanceMode === 'hybrid'
                ? 'https://schema.org/MixedEventAttendanceMode'
                : 'https://schema.org/OfflineEventAttendanceMode'
        }
      : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    location: event.place
      ? { '@type': 'Place', name: event.place, address: event.place }
      : { '@type': 'VirtualLocation', url: `https://teenagespace.com/opportunities/event/${event.id}` },
    organizer: event.organizerName ? { '@type': 'Organization', name: event.organizerName, url: event.organizerUrl ?? undefined } : undefined,
    offers: event.registrationUrl
      ? {
          '@type': 'Offer',
          url: event.registrationUrl,
          price: event.price === 'free' ? 0 : undefined,
          priceCurrency: event.price === 'free' ? 'KGS' : undefined
        }
      : undefined
  };

  return (
    <div className="ts-article-page">
      <Seo
        title={event.title}
        description={event.short || event.description}
        path={`/opportunities/event/${event.id}`}
        image={event.imageUrl ?? undefined}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="ts-modal ts-modal-standalone">
        <EventDetails event={event} fav={favorites.has(event.id)} onToggleFav={() => toggle(event.id)} loggedIn={!!session} />
      </div>
    </div>
  );
}
