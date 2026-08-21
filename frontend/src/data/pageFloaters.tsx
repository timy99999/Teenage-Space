// Decorative study/project icons that drift around the whole home page.
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
};

const BookIcon = (
  <svg {...iconProps}>
    <path d="M4 4.5c2.2-.8 4.6-.8 8 .6 3.4-1.4 5.8-1.4 8-.6v14c-2.2-.8-4.6-.8-8 .6-3.4-1.4-5.8-1.4-8-.6v-14Z" />
    <path d="M12 5.1v14" />
  </svg>
);
const MedalIcon = (
  <svg {...iconProps}>
    <path d="M8 3h8l-2.5 6h-3L8 3Z" />
    <circle cx="12" cy="15" r="6" />
    <path d="M12 12.4 13 14.6 15.4 14.9 13.6 16.5 14 18.9 12 17.7 10 18.9 10.4 16.5 8.6 14.9 11 14.6 12 12.4Z" />
  </svg>
);
const PencilIcon = (
  <svg {...iconProps}>
    <path d="m14.5 4.5 5 5L8 21l-5.4 1 1-5.4L14.5 4.5Z" />
    <path d="m13 6 5 5" />
  </svg>
);
const BulbIcon = (
  <svg {...iconProps}>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);
const TrophyIcon = (
  <svg {...iconProps}>
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
    <path d="M7 5H4v2a3 3 0 0 0 3 3" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3" />
    <path d="M12 13v3.2" />
    <path d="M9 20h6" />
  </svg>
);
const CapIcon = (
  <svg {...iconProps}>
    <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
    <path d="M6 11.7v4.2c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.2" />
  </svg>
);
const TargetIcon = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);
const StarIcon = (
  <svg {...iconProps}>
    <path d="M12 3.5 14.6 9.4 21 10.1 16.2 14.3 17.6 20.6 12 17.3 6.4 20.6 7.8 14.3 3 10.1 9.4 9.4 12 3.5Z" />
  </svg>
);

export type Floater = {
  key: string;
  icon: JSX.Element;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  variant: 1 | 2 | 3 | 4;
};

// Scattered across the full page height (top/left are percentages of the page, not the viewport)
// with mismatched durations/delays/variants so the drift reads as chaotic rather than synced.
export const PAGE_FLOATERS: Floater[] = [
  { key: 'book1', icon: BookIcon, size: 30, top: '6%', left: '13%', duration: 15, delay: 0, variant: 1 },
  { key: 'medal1', icon: MedalIcon, size: 26, top: '16%', left: '86%', duration: 19, delay: 2, variant: 2 },
  { key: 'pencil1', icon: PencilIcon, size: 24, top: '30%', left: '4%', duration: 13, delay: 1, variant: 3 },
  { key: 'bulb1', icon: BulbIcon, size: 28, top: '38%', left: '92%', duration: 17, delay: 3.5, variant: 4 },
  { key: 'trophy1', icon: TrophyIcon, size: 30, top: '52%', left: '9%', duration: 21, delay: 1.5, variant: 2 },
  { key: 'cap1', icon: CapIcon, size: 30, top: '63%', left: '90%', duration: 14, delay: 0.5, variant: 1 },
  { key: 'target1', icon: TargetIcon, size: 24, top: '74%', left: '6%', duration: 18, delay: 4, variant: 3 },
  { key: 'book2', icon: BookIcon, size: 22, top: '86%', left: '88%', duration: 16, delay: 2.5, variant: 4 },
  { key: 'medal2', icon: MedalIcon, size: 22, top: '95%', left: '22%', duration: 20, delay: 1, variant: 2 }
];

export const ORBIT_FLOATER: Floater = {
  key: 'orbiter',
  icon: StarIcon,
  size: 26,
  top: '4%',
  left: '8%',
  duration: 34,
  delay: 0,
  variant: 1
};
