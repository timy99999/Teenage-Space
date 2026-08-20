import type { CategoryDef } from '../types';

export const CATS: CategoryDef[] = [
  { key: 'volunteering', label: 'Волонтёрство' },
  { key: 'social', label: 'Социальные проекты' },
  { key: 'eduevent', label: 'Образовательные мероприятия' },
  { key: 'contest', label: 'Конкурсы' },
  { key: 'hackathon', label: 'Хакатоны' },
  { key: 'olympiad', label: 'Олимпиады' },
  { key: 'other', label: 'Другое' }
];

// "Другое" не отображается как своя вкладка/фильтр — такие мероприятия видны только в общей сетке.
export const NAV_CATS: CategoryDef[] = CATS.filter((c) => c.key !== 'other');

export const THEMES: CategoryDef[] = [
  { key: 'sport', label: 'Спорт' },
  { key: 'it', label: 'IT и AI' },
  { key: 'eco', label: 'Экология' },
  { key: 'media', label: 'Медиа' },
  { key: 'mun', label: 'MUN' },
  { key: 'other', label: 'Другое' }
];

export const AGES = ['До 14', '14', '15', '16', '17', '18', '18+', '21+', 'Любой'];

export const CATN: Record<string, string> = {
  volunteering: 'волонтёрство',
  social: 'соцпроекты',
  eduevent: 'образование',
  contest: 'конкурсы',
  hackathon: 'хакатоны',
  olympiad: 'олимпиады',
  other: 'другое'
};

export const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const TITLES: Record<string, string> = {
  home: 'Главное',
  news: 'Новости',
  opps: 'Возможности',
  fav: 'Избранное',
  vote: 'Голосование',
  settings: 'Настройки',
  profile: 'Профиль',
  publish: 'Публикация поста',
  auth: 'Вход'
};

export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}

export function fmtDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}
