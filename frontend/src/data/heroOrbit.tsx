// Icons orbiting the hero logo, one per event category shown on the home page.
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
};

export const ORBIT_ITEMS = [
  {
    key: 'volunteering',
    label: 'Волонтёрство',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20.3s-7-4.3-9.4-8.7C1.1 8.3 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.6C11 6.1 12.4 5 14.4 5c3.4 0 4.6 3.3 3.1 6.6C15.1 16 12 20.3 12 20.3Z" />
      </svg>
    )
  },
  {
    key: 'social',
    label: 'Социальные проекты',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M15.6 14.2c2.4.3 4.2 2 4.2 4.3" />
      </svg>
    )
  },
  {
    key: 'eduevent',
    label: 'Образовательные мероприятия',
    icon: (
      <svg {...iconProps}>
        <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
        <path d="M6 11.7v4.2c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.2" />
        <path d="M21 9.5v5.3" />
      </svg>
    )
  },
  {
    key: 'contest',
    label: 'Конкурсы',
    icon: (
      <svg {...iconProps}>
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 5H4v2a3 3 0 0 0 3 3" />
        <path d="M17 5h3v2a3 3 0 0 1-3 3" />
        <path d="M12 13v3.2" />
        <path d="M9 20h6" />
        <path d="M10.2 16.2h3.6l.4 2.4H9.8l.4-2.4Z" />
      </svg>
    )
  },
  {
    key: 'hackathon',
    label: 'Хакатоны',
    icon: (
      <svg {...iconProps}>
        <path d="M8 8 3.5 12 8 16" />
        <path d="M16 8l4.5 4-4.5 4" />
        <path d="M13.5 6.5l-3 11" />
      </svg>
    )
  },
  {
    key: 'olympiad',
    label: 'Олимпиады',
    icon: (
      <svg {...iconProps}>
        <path d="M8 3h8l-2.5 6h-3L8 3Z" />
        <circle cx="12" cy="15" r="6" />
        <path d="M12 12.2 13.1 14.5 15.6 14.8 13.8 16.5 14.2 19 12 17.8 9.8 19 10.2 16.5 8.4 14.8 10.9 14.5 12 12.2Z" />
      </svg>
    )
  }
];
