import type { EventItem } from '../types';
import { CATS, fmtDate } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { TrashIcon } from './TrashIcon';

interface EventCardProps {
  event: EventItem;
  onOpen: () => void;
  isVoteMode: boolean;
  favActive: boolean;
  onToggleFav: () => void;
  rating: number;
  onRate: (n: number) => void;
  canDelete?: boolean;
  onDelete?: () => void;
}

export function EventCard({ event, onOpen, isVoteMode, favActive, onToggleFav, rating, onRate, canDelete, onDelete }: EventCardProps) {
  const catLabel = CATS.find((c) => c.key === event.category)?.label ?? event.category;
  const priceLabel = event.price === 'free' ? 'Бесплатно' : event.cost ?? '';

  return (
    <article className="ts-card">
      <button className="ts-card-img" onClick={onOpen}>
        <EventPhoto src={event.imageUrl} alt={event.title} />
        <span className="ts-card-cat-badge">{catLabel}</span>
      </button>
      <button className="ts-card-body" onClick={onOpen}>
        <h3 className="ts-card-title">{event.title}</h3>
        <p className="ts-card-short">{event.short}</p>
        <div className="ts-card-meta">
          <span>{fmtDate(event.eventDate)}</span>
          <span>{event.ageLabel}</span>
          <span>{priceLabel}</span>
        </div>
      </button>
      <div className="ts-card-foot">
        {isVoteMode ? (
          <div className="ts-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`ts-star-btn${n <= rating ? ' on' : ''}`}
                onClick={() => onRate(n)}
                aria-label={`Оценить на ${n}`}
              >
                ★
              </button>
            ))}
          </div>
        ) : (
          <button
            className={`ts-fav-btn${favActive ? ' on' : ''}`}
            title="В избранное"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav();
            }}
          >
            ★
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {event.instagram && (
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="ts-icon-link"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"></circle>
              </svg>
            </a>
          )}
          {event.registrationUrl && (
            <button className="ts-btn-outline small" onClick={onOpen}>
              Регистрация
            </button>
          )}
          {canDelete && (
            <button
              className="ts-icon-link danger"
              title="Удалить пост"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
