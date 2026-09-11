// Пара глифов для пресет-чипов (data/presets.ts): молния в покое, галочка когда
// параметры пресета активны. Декоративные — смысл несёт подпись рядом.
const svgProps = {
  className: 'ts-preset-chip-glyph',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export function BoltIcon() {
  return (
    <svg {...svgProps} fill="currentColor">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
