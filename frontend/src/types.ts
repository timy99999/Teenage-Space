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
  imageUrl: string | null;
}

export interface CreateNewsInput {
  title: string;
  shortDesc: string;
  eventDate: string;
  imageUrl: string | null;
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

export type Role = 'user' | 'admin';

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
  role: Role;
  isBanned: boolean;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  title: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface AdminSubmission {
  id: string;
  userId: string;
  title: string;
  categories: string[];
  themes: string[];
  ages: string[];
  format: string[];
  price: PriceType | null;
  cost: string | null;
  charity: boolean;
  level: Level | null;
  eventDate: string | null;
  deadlineDate: string | null;
  address: string | null;
  audience: string | null;
  description: string | null;
  registrationUrl: string | null;
  extraLinkTitle: string | null;
  extraLinkUrl: string | null;
  instagram: string | null;
  telegram: string | null;
  whatsapp: string | null;
  status: SubmissionStatus;
  createdAt: string;
  publishedEventId: string | null;
  imageUrl: string | null;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  lastName: string;
  email: string | null;
  role: Role;
  isBanned: boolean;
}

export interface Analytics {
  usersTotal: number;
  bannedTotal: number;
  eventsTotal: number;
  eventsUpcoming: number;
  eventsPast: number;
  favoritesTotal: number;
  ratingsTotal: number;
  ratingsAvg: number | null;
  submissions: { pending: number; approved: number; rejected: number };
}

export interface CreateEventInput {
  title: string;
  category: string;
  themes: string[];
  ageMin: number;
  ageMax: number;
  ageLabel: string;
  price: PriceType;
  cost: string | null;
  level: Level;
  format: string;
  eventDate: string;
  deadlineDate: string | null;
  place: string;
  shortDesc: string;
  description: string;
  instagram: boolean;
  registrationUrl: string | null;
  imageUrl: string | null;
}
