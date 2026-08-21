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
  eventDate: string | null;
  deadlineDate: string | null;
  place: string;
  audience: string | null;
  short: string;
  description: string;
  instagram: string | null;
  registrationUrl: string | null;
  extraLinkTitle: string | null;
  extraLinkUrl: string | null;
  telegram: string | null;
  isPast: boolean;
  archived: boolean;
  imageUrl: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  short: string;
  imageUrl: string | null;
  linkTitle: string | null;
  linkUrl: string | null;
}

export interface CreateNewsInput {
  title: string;
  shortDesc: string;
  eventDate: string;
  imageUrl: string | null;
  linkTitle: string | null;
  linkUrl: string | null;
}

export interface MaterialItem {
  id: string;
  track: string;
  title: string;
  meta: string;
  body: string[];
  sortOrder: number;
}

export interface EducationTrack {
  id: string;
  title: string;
  intro: string;
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
  category: string | null;
  themes: string[];
  ageMin: number | null;
  ageMax: number | null;
  format: string | null;
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

/**
 * One shared shape for "create/publish an event" — used identically by the
 * public submission form (PublishPage) and the admin's direct-publish/edit
 * forms. Fields with no `events` column (audience, extraLink*, charity) are
 * simply dropped server-side when publishing straight to an event.
 * ageMin/ageMax use '' as the "field is empty while typing" state.
 */
export interface PostFormValue {
  imageUrl: string | null;
  title: string;
  category: string;
  themes: string[];
  ageMin: number | '';
  ageMax: number | '';
  format: string;
  price: PriceType | null;
  cost: string;
  charity: boolean;
  level: Level | null;
  eventDate: string;
  deadlineDate: string;
  address: string;
  audience: string;
  description: string;
  registrationUrl: string;
  extraLinkTitle: string;
  extraLinkUrl: string;
  instagram: string;
  telegram: string;
}
