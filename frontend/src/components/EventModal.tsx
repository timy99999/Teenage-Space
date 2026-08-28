import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import { CATS, THEMES, fmtDate, fmtEventWhen } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { trackCardView, trackLinkClick } from '../lib/tracking';

function telegramUrl(handle: string): string {
  if (handle.startsWith('http')) return handle;
  return `https://t.me/${handle.replace(/^@/, '')}`;
}

function instagramUrl(handle: string): string {
  if (handle.startsWith('http')) return handle;
  return `https://instagram.com/${handle.replace(/^@/, '')}`;
}

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
  const themeLabel = event.themes.map((t) => THEMES.find((x) => x.key === t)?.label ?? t).join(', ');
  const priceLabel = event.price === 'free' ? 'Бесплатно' : event.cost ?? '';
  const fields = [
    ...(themeLabel ? [{ l: 'Тема', v: themeLabel }] : []),
    { l: 'Возраст', v: event.ageLabel },
    ...(event.format ? [{ l: 'Формат участия', v: event.format }] : []),
    ...(priceLabel ? [{ l: 'Цена', v: priceLabel }] : []),
    { l: 'Уровень', v: event.level === 'local' ? 'Локальное' : 'Международное' },
    ...(event.eventDate ? [{ l: 'Дата', v: fmtEventWhen(event.eventDate, event.eventDateEnd, event.eventTime) }] : []),
    ...(event.deadlineDate ? [{ l: 'Дедлайн регистрации', v: fmtDate(event.deadlineDate) }] : []),
    ...(event.place ? [{ l: 'Адрес', v: event.place }] : [])
  ];

  return (
    <div className="ts-modal-overlay" onClick={close}>
      <div className="ts-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ts-modal-close" onClick={close}>
          ←
        </button>
        <div className="ts-modal-grid">
          <div className="ts-modal-img">
            <EventPhoto src={event.imageUrl} alt={event.title} />
          </div>
          <div className="ts-modal-body">
            <div className="ts-modal-cat">{CATS.find((c) => c.key === event.category)?.label}</div>
            <h2 className="ts-modal-title">{event.title}</h2>
            <p className="ts-modal-desc">{event.description}</p>
            {event.audience && (
              <div className="ts-modal-audience">
                <div className="ts-modal-field-label">Для кого</div>
                <p className="ts-modal-desc">{event.audience}</p>
              </div>
            )}
            <div className="ts-modal-fields">
              {fields.map((f) => (
                <div className="ts-modal-field" key={f.l}>
                  <div className="ts-modal-field-label">{f.l}</div>
                  <div className="ts-modal-field-value">{f.v}</div>
                </div>
              ))}
            </div>
            <div className="ts-modal-actions">
              <button className={`ts-fav-btn big${fav ? ' on' : ''}`} onClick={() => toggle(event.id)}>
                ★
              </button>
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ts-pill-link"
                  onClick={() => trackLinkClick('registration', !!session, { targetType: 'event', targetId: event.id })}
                >
                  Регистрация
                </a>
              )}
              {event.instagram && (
                <a
                  href={instagramUrl(event.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="ts-pill-link ghost insta"
                  onClick={() => trackLinkClick('instagram', !!session, { targetType: 'event', targetId: event.id })}
                >
                  Instagram
                </a>
              )}
              {event.telegram && (
                <a
                  href={telegramUrl(event.telegram)}
                  target="_blank"
                  rel="noreferrer"
                  className="ts-pill-link ghost"
                  onClick={() => trackLinkClick('telegram', !!session, { targetType: 'event', targetId: event.id })}
                >
                  Telegram
                </a>
              )}
              {event.extraLinkUrl && (
                <a
                  href={event.extraLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ts-pill-link ghost"
                  onClick={() => trackLinkClick('extra_link', !!session, { targetType: 'event', targetId: event.id })}
                >
                  {event.extraLinkTitle || 'Ссылка'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
