import { plural } from '../data/constants';

// Registration-deadline helpers. `deadlineDate` from the API is a bare calendar
// date (YYYY-MM-DD, no time). "Days left" is counted in Asia/Bishkek — Kyrgyzstan
// has no DST, so a fixed UTC+6 offset matches the backend (events.service.ts).
const BISHKEK_UTC_OFFSET_MS = 6 * 60 * 60 * 1000;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;

function dateToUTCDay(y: number, m: number, d: number): number {
  return Date.UTC(y, m - 1, d);
}

/** Today's calendar date in Bishkek, as a UTC-midnight timestamp. */
function todayInBishkekUTCDay(): number {
  const s = new Date(Date.now() + BISHKEK_UTC_OFFSET_MS).toISOString();
  const m = DATE_RE.exec(s)!;
  return dateToUTCDay(+m[1], +m[2], +m[3]);
}

export type DeadlineState =
  | { kind: 'none' }
  | { kind: 'closed' }
  | { kind: 'today' }
  | { kind: 'soon'; days: number }
  | { kind: 'far'; days: number };

export function deadlineState(deadlineDate: string | null | undefined): DeadlineState {
  if (!deadlineDate) return { kind: 'none' };
  const m = DATE_RE.exec(deadlineDate);
  if (!m) return { kind: 'none' };
  const deadline = dateToUTCDay(+m[1], +m[2], +m[3]);
  const days = Math.round((deadline - todayInBishkekUTCDay()) / 86_400_000);
  if (days < 0) return { kind: 'closed' };
  if (days === 0) return { kind: 'today' };
  if (days <= 7) return { kind: 'soon', days };
  return { kind: 'far', days };
}

export interface DeadlineBadge {
  text: string;
  /** CSS modifier: ts-deadline-badge--{tone} */
  tone: 'urgent' | 'soon' | 'closed';
}

/**
 * Badge to render on a card, or null when none should be shown (8+ days / no date).
 * A past event (`isPast`) never shows a "register now" badge — its deadline data
 * isn't guaranteed to be consistent with the event's status.
 */
export function deadlineBadge(
  deadlineDate: string | null | undefined,
  opts: { isPast?: boolean } = {}
): DeadlineBadge | null {
  const s = deadlineState(deadlineDate);
  if (opts.isPast) {
    return s.kind === 'none' ? null : { text: 'Регистрация закрыта', tone: 'closed' };
  }
  switch (s.kind) {
    case 'today':
      return { text: 'Дедлайн сегодня', tone: 'urgent' };
    case 'soon':
      return { text: `Дедлайн через ${plural(s.days, 'день', 'дня', 'дней')}`, tone: 'soon' };
    case 'closed':
      return { text: 'Регистрация закрыта', tone: 'closed' };
    default:
      return null;
  }
}
