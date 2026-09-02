import { useEffect, useRef, useState } from 'react';
import type { EventItem } from '../types';
import { fmtEventWhen } from '../data/constants';
import { EventPhoto } from './EventPhoto';
import { useAuth } from '../contexts/AuthContext';
import { trackLinkClick } from '../lib/tracking';

function instagramUrl(handle: string): string {
  if (handle.startsWith('http')) return handle;
  return `https://instagram.com/${handle.replace(/^@/, '')}`;
}

export interface EventCardAdminActions {
  onEdit: () => void;
  onArchive: () => void;
  onMoveToVoting: () => void;
  onDelete: () => void;
}

interface EventCardProps {
  event: EventItem;
  onOpen: () => void;
  isVoteMode: boolean;
  favActive: boolean;
  onToggleFav: () => void;
  rating: number;
  onRate: (n: number) => void;
  admin?: EventCardAdminActions;
  /** Unique-view count, super_admin only — shown as a badge on the card. */
  viewCount?: number;
}

export function EventCard({ event, onOpen, isVoteMode, favActive, onToggleFav, rating, onRate, admin, viewCount }: EventCardProps) {
  const priceLabel = event.price === 'free' ? 'Бесплатно' : event.cost ?? '';
  const { session } = useAuth();

  return (
    <article className="ts-card">
      <div className="ts-card-img-wrap">
        <button className="ts-card-img" onClick={onOpen}>
          <EventPhoto src={event.imageUrl} alt={event.title} />
        </button>
        {event.organizerName &&
          (event.organizerUrl ? (
            <a
              className="ts-card-organizer"
              href={event.organizerUrl}
              target="_blank"
              rel="noreferrer"
              title={event.organizerName}
              onClick={(e) => e.stopPropagation()}
            >
              {event.organizerName}
            </a>
          ) : (
            <span className="ts-card-organizer" title={event.organizerName}>
              {event.organizerName}
            </span>
          ))}
        {event.charity && (
          <span className="ts-card-charity-badge" style={admin ? { right: 44 } : undefined}>
            Благотворительное
          </span>
        )}
        {admin && <CardMenu isVoteMode={isVoteMode} {...admin} />}
        {viewCount !== undefined && (
          <span className="ts-card-views-badge" title="Уникальных просмотров">
            👁 {viewCount}
          </span>
        )}
      </div>
      <button className="ts-card-body" onClick={onOpen}>
        <h3 className="ts-card-title">{event.title}</h3>
        <p className="ts-card-short">{event.short}</p>
        <div className="ts-card-meta">
          {event.eventDate && <span>{fmtEventWhen(event.eventDate, event.eventDateEnd, event.eventTime)}</span>}
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
              href={instagramUrl(event.instagram)}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="ts-icon-link"
              onClick={(e) => {
                e.stopPropagation();
                trackLinkClick('instagram', !!session, { targetType: 'event', targetId: event.id });
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"></circle>
              </svg>
            </a>
          )}
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="ts-btn-outline small"
              onClick={(e) => {
                e.stopPropagation();
                trackLinkClick('registration', !!session, { targetType: 'event', targetId: event.id });
              }}
            >
              Регистрация
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function CardMenu({ isVoteMode, onEdit, onArchive, onMoveToVoting, onDelete }: EventCardAdminActions & { isVoteMode: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  function pick(action: () => void) {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(false);
      action();
    };
  }

  return (
    <div className="ts-card-menu" ref={ref}>
      <button
        className="ts-card-menu-btn"
        title="Действия"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        ⋮
      </button>
      {open && (
        <div className="ts-card-menu-dropdown">
          <button onClick={pick(onEdit)}>Редактировать</button>
          <button onClick={pick(onArchive)}>Перенести в архив</button>
          {!isVoteMode && <button onClick={pick(onMoveToVoting)}>Перенести в голосование</button>}
          <button className="danger" onClick={pick(onDelete)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
