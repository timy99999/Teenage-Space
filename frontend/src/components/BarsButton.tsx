// "Спросить Барса" (P1, spec (d)) — deep-links into the Telegram bot with a short
// slug describing where the user came from (section + at most one active preset).
// Reused as-is in the toolbar (row 1) and in empty states 2/3/4 — same markup,
// mobile CSS shortens the label and hides the @handle hint either way.
import { barsAskSlug, barsBotHandle, barsDeepLink } from '../lib/barsDeepLink';

function ChatIcon() {
  return (
    <svg
      className="ts-bars-btn-ico"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function BarsButton({ category, presetSlug }: { category?: string | null; presetSlug?: string | null }) {
  const slug = barsAskSlug(category ?? null, presetSlug ?? null);
  return (
    <a
      className="ts-bars-btn"
      href={barsDeepLink(slug)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Спросить Барса про эти возможности"
    >
      <ChatIcon />
      <span className="ts-bars-btn-full">Спросить Барса</span>
      <span className="ts-bars-btn-short">Барс</span>
      <span className="ts-bars-btn-hint">{barsBotHandle()}</span>
    </a>
  );
}
