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
  variant: number;
};

// Small local drift — scattered across the full page height (top/left are percentages of the
// page, not the viewport), each on a mismatched wander animation so the motion reads as chaotic.
export const WANDER_FLOATERS: Floater[] = [
  { key: 'book1', icon: BookIcon, size: 30, top: '6%', left: '13%', duration: 15, delay: 0, variant: 1 },
  { key: 'medal1', icon: MedalIcon, size: 26, top: '14%', left: '85%', duration: 19, delay: 2, variant: 2 },
  { key: 'pencil1', icon: PencilIcon, size: 24, top: '24%', left: '4%', duration: 13, delay: 1, variant: 3 },
  { key: 'bulb1', icon: BulbIcon, size: 28, top: '34%', left: '92%', duration: 17, delay: 3.5, variant: 4 },
  { key: 'trophy1', icon: TrophyIcon, size: 30, top: '44%', left: '9%', duration: 21, delay: 1.5, variant: 2 },
  { key: 'cap1', icon: CapIcon, size: 30, top: '54%', left: '90%', duration: 14, delay: 0.5, variant: 1 },
  { key: 'target1', icon: TargetIcon, size: 24, top: '64%', left: '5%', duration: 18, delay: 4, variant: 3 },
  { key: 'book2', icon: BookIcon, size: 22, top: '74%', left: '88%', duration: 16, delay: 2.5, variant: 4 },
  { key: 'medal2', icon: MedalIcon, size: 22, top: '84%', left: '12%', duration: 20, delay: 1, variant: 2 },
  { key: 'pencil2', icon: PencilIcon, size: 22, top: '93%', left: '82%', duration: 12, delay: 3, variant: 1 },
  { key: 'bulb2', icon: BulbIcon, size: 24, top: '10%', left: '48%', duration: 16, delay: 2, variant: 3 },
  { key: 'trophy2', icon: TrophyIcon, size: 26, top: '19%', left: '65%', duration: 18, delay: 4.5, variant: 1 },
  { key: 'cap2', icon: CapIcon, size: 24, top: '29%', left: '38%', duration: 15, delay: 1.8, variant: 4 },
  { key: 'target2', icon: TargetIcon, size: 20, top: '39%', left: '58%', duration: 19, delay: 3.2, variant: 2 },
  { key: 'book3', icon: BookIcon, size: 26, top: '49%', left: '45%', duration: 14, delay: 0.8, variant: 3 },
  { key: 'medal3', icon: MedalIcon, size: 20, top: '59%', left: '25%', duration: 17, delay: 2.8, variant: 4 },
  { key: 'pencil3', icon: PencilIcon, size: 22, top: '69%', left: '55%', duration: 13, delay: 4.2, variant: 2 },
  { key: 'bulb3', icon: BulbIcon, size: 24, top: '79%', left: '68%', duration: 20, delay: 1.3, variant: 1 },
  { key: 'trophy3', icon: TrophyIcon, size: 22, top: '88%', left: '42%', duration: 16, delay: 3.6, variant: 3 },
  { key: 'book4', icon: BookIcon, size: 24, top: '5%', left: '30%', duration: 15, delay: 3.8, variant: 2 },
  { key: 'medal4', icon: MedalIcon, size: 24, top: '15%', left: '70%', duration: 18, delay: 0.3, variant: 4 },
  { key: 'pencil4', icon: PencilIcon, size: 20, top: '22%', left: '15%', duration: 13, delay: 2.2, variant: 1 },
  { key: 'bulb4', icon: BulbIcon, size: 26, top: '32%', left: '78%', duration: 19, delay: 4.8, variant: 3 },
  { key: 'trophy4', icon: TrophyIcon, size: 22, top: '42%', left: '20%', duration: 16, delay: 1.1, variant: 2 },
  { key: 'cap3', icon: CapIcon, size: 26, top: '52%', left: '60%', duration: 14, delay: 3.4, variant: 4 },
  { key: 'target3', icon: TargetIcon, size: 22, top: '62%', left: '32%', duration: 17, delay: 0.6, variant: 1 },
  { key: 'book5', icon: BookIcon, size: 20, top: '72%', left: '8%', duration: 20, delay: 2.6, variant: 3 },
  { key: 'medal5', icon: MedalIcon, size: 22, top: '82%', left: '78%', duration: 15, delay: 4.1, variant: 2 },
  { key: 'pencil5', icon: PencilIcon, size: 24, top: '90%', left: '20%', duration: 12, delay: 1.7, variant: 4 },
  { key: 'bulb5', icon: BulbIcon, size: 20, top: '96%', left: '60%', duration: 18, delay: 3.0, variant: 1 },
  { key: 'trophy5', icon: TrophyIcon, size: 26, top: '3%', left: '55%', duration: 21, delay: 0.9, variant: 3 }
];

// Big sweeping curves across the whole page — the same "shooting star" motion as the star icon,
// just spread across five differently shaped loops so ten of them don't all trace one path.
export const ORBIT_FLOATERS: Floater[] = [
  { key: 'star-a', icon: StarIcon, size: 26, top: '4%', left: '8%', duration: 34, delay: 0, variant: 1 },
  { key: 'star-b', icon: StarIcon, size: 20, top: '4%', left: '8%', duration: 29, delay: 14, variant: 1 },
  { key: 'star-c', icon: StarIcon, size: 24, top: '90%', left: '85%', duration: 38, delay: 5, variant: 2 },
  { key: 'medal-o', icon: MedalIcon, size: 22, top: '90%', left: '85%', duration: 31, delay: 20, variant: 2 },
  { key: 'book-o', icon: BookIcon, size: 24, top: '48%', left: '3%', duration: 36, delay: 8, variant: 3 },
  { key: 'trophy-o', icon: TrophyIcon, size: 22, top: '48%', left: '3%', duration: 27, delay: 18, variant: 3 },
  { key: 'cap-o', icon: CapIcon, size: 26, top: '8%', left: '92%', duration: 40, delay: 3, variant: 4 },
  { key: 'bulb-o', icon: BulbIcon, size: 20, top: '8%', left: '92%', duration: 25, delay: 16, variant: 4 },
  { key: 'star-d', icon: StarIcon, size: 28, top: '96%', left: '12%', duration: 33, delay: 10, variant: 5 },
  { key: 'target-o', icon: TargetIcon, size: 20, top: '96%', left: '12%', duration: 30, delay: 22, variant: 5 },
  { key: 'star-e', icon: StarIcon, size: 22, top: '20%', left: '50%', duration: 35, delay: 6, variant: 1 },
  { key: 'pencil-o', icon: PencilIcon, size: 20, top: '20%', left: '50%', duration: 28, delay: 19, variant: 1 },
  { key: 'star-f', icon: StarIcon, size: 26, top: '65%', left: '95%', duration: 32, delay: 11, variant: 2 },
  { key: 'cap-o2', icon: CapIcon, size: 22, top: '65%', left: '95%', duration: 26, delay: 24, variant: 2 },
  { key: 'star-g', icon: StarIcon, size: 24, top: '35%', left: '20%', duration: 37, delay: 7, variant: 3 },
  { key: 'star-h', icon: StarIcon, size: 22, top: '12%', left: '30%', duration: 33, delay: 2, variant: 4 },
  { key: 'medal-o2', icon: MedalIcon, size: 20, top: '12%', left: '30%', duration: 27, delay: 17, variant: 4 },
  { key: 'book-o2', icon: BookIcon, size: 24, top: '55%', left: '50%', duration: 36, delay: 9, variant: 5 },
  { key: 'trophy-o2', icon: TrophyIcon, size: 20, top: '55%', left: '50%', duration: 29, delay: 23, variant: 5 },
  { key: 'cap-o3', icon: CapIcon, size: 22, top: '25%', left: '8%', duration: 31, delay: 4, variant: 2 },
  { key: 'bulb-o2', icon: BulbIcon, size: 22, top: '25%', left: '8%', duration: 24, delay: 15, variant: 2 },
  { key: 'target-o2', icon: TargetIcon, size: 20, top: '78%', left: '25%', duration: 34, delay: 12, variant: 1 },
  { key: 'pencil-o2', icon: PencilIcon, size: 20, top: '78%', left: '25%', duration: 26, delay: 27, variant: 1 }
];
