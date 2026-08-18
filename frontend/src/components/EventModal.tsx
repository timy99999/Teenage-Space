import { useSearchParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { useFavorites } from '../hooks/useFavorites';
import { CATS, THEMES, fmtDate } from '../data/constants';
import { EventPhoto } from './EventPhoto';

export function EventModal() {
  const [params, setParams] = useSearchParams();
  const eventId = params.get('event');
  const event = useEvent(eventId);
  const { favorites, toggle } = useFavorites();

  if (!eventId || !event) return null;

  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('event');
    setParams(next, { replace: true });
  };

  const fav = favorites.has(event.id);
  const fields = [
    { l: 'Тема', v: event.themes.map((t) => THEMES.find((x) => x.key === t)?.label ?? t).join(', ') },
    { l: 'Возраст', v: event.ageLabel },
    { l: 'Формат участия', v: event.format },
    { l: 'Цена', v: event.price === 'free' ? 'Бесплатно' : event.cost ?? '' },
    { l: 'Уровень', v: event.level === 'local' ? 'Локальное' : 'Международное' },
    { l: 'Дата', v: fmtDate(event.eventDate) },
    { l: 'Дедлайн регистрации', v: event.deadlineDate ? fmtDate(event.deadlineDate) : '—' },
    { l: 'Адрес', v: event.place }
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
                <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="ts-pill-link">
                  Регистрация
                </a>
              )}
              {event.instagram && (
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ts-pill-link ghost insta">
                  Instagram
                </a>
              )}
              <a href="https://telegram.org" target="_blank" rel="noreferrer" className="ts-pill-link ghost">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
