// Inline SVG icon set for the card meta-row (date / age / level).
// Feather/Lucide style, monochrome, inherits `currentColor` from `.ts-card-meta`.
// Meaning is always duplicated by adjacent text — icons are decorative (`aria-hidden`).

const svgProps = {
  className: 'ts-meta-ico',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function CalendarIcon() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
    </svg>
  );
}

export function CapIcon() {
  return (
    <svg {...svgProps}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.6 2.7 3 6 3s6-1.4 6-3v-5" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  );
}
