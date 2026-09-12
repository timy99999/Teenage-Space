import type { EventItem } from '../types';
import { CATS, THEMES, fmtDate, fmtEventWhen } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { trackLinkClick } from '../lib/tracking';

function telegramUrl(handle: string): string {
  if (handle.startsWith('http')) return handle;
  return `https://t.me/${handle.replace(/^@/, '')}`;
}

function instagramUrl(handle: string): string {
  if (handle.startsWith('http')) return handle;
  return `https://instagram.com/${handle.replace(/^@/, '')}`;
}

interface EventDetailsProps {
  event: EventItem;
  fav: boolean;
  onToggleFav: () => void;
  loggedIn: boolean;
}

/** The event's image + fields + action links — shared between the in-app modal
 *  (EventModal) and the standalone permalink page (EventPage), so the two never
 *  drift out of sync. */
export function EventDetails({ event, fav, onToggleFav, loggedIn }: EventDetailsProps) {
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
    <div className="ts-modal-grid">
      <div className="ts-modal-img">
        <EventPhoto src={event.imageUrl} alt={event.title} />
        {event.organizerName &&
          (event.organizerUrl ? (
            <a
              className="ts-card-organizer"
              href={event.organizerUrl}
              target="_blank"
              rel="noreferrer"
              title={event.organizerName}
            >
              {event.organizerName}
            </a>
          ) : (
            <span className="ts-card-organizer" title={event.organizerName}>
              {event.organizerName}
            </span>
          ))}
      </div>
      <div className="ts-modal-body">
        <div className="ts-modal-cat">
          {(event.categories.length ? event.categories : [event.category])
            .map((k) => CATS.find((c) => c.key === k)?.label ?? k)
            .join(' · ')}
        </div>
        <h1 className="ts-modal-title">{event.title}</h1>
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
          <button className={`ts-fav-btn big${fav ? ' on' : ''}`} onClick={onToggleFav}>
            ★
          </button>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="ts-pill-link"
              onClick={() => trackLinkClick('registration', loggedIn, { targetType: 'event', targetId: event.id })}
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
              onClick={() => trackLinkClick('instagram', loggedIn, { targetType: 'event', targetId: event.id })}
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
              onClick={() => trackLinkClick('telegram', loggedIn, { targetType: 'event', targetId: event.id })}
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
              onClick={() => trackLinkClick('extra_link', loggedIn, { targetType: 'event', targetId: event.id })}
            >
              {event.extraLinkTitle || 'Ссылка'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
