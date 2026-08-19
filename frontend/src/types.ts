export type PriceType = 'free' | 'paid';
export type Level = 'local' | 'intl';
export type Format = 'Личное' | 'Командное';

export interface EventItem {
  id: string;
  title: string;
  category: string;
  themes: string[];
  ageMin: number;
  ageMax: number;
  ageLabel: string;
  price: PriceType;
  cost: string | null;
  level: Level;
  format: Format;
  eventDate: string;
  deadlineDate: string | null;
  place: string;
  short: string;
  description: string;
  instagram: boolean;
  registrationUrl: string | null;
  isPast: boolean;
  imageUrl: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  short: string;
}

export interface MaterialItem {
  id: string;
  track: string;
  title: string;
  meta: string;
  body: string[];
  sortOrder: number;
}

export interface CategoryDef {
  key: string;
  label: string;
}

export interface Profile {
  id: string;
  username: string;
  name: string;
  lastName: string;
  birthDate: string | null;
  email: string | null;
  avatarUrl: string | null;
  theme: 'light' | 'dark';
  notifOptIn: boolean;
  nameChangedAt: string | null;
  usernameChangedAt: string | null;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  title: string;
  status: SubmissionStatus;
  createdAt: string;
}
