export interface EventRow {
  id: string;
  title: string;
  category: string;
  themes: string[];
  age_min: number;
  age_max: number;
  age_label: string;
  price: 'free' | 'paid';
  cost: string | null;
  level: 'local' | 'intl';
  format: string;
  event_date: string;
  deadline_date: string | null;
  place: string;
  short_desc: string;
  description: string;
  instagram: boolean;
  registration_url: string | null;
  is_past: boolean;
  image_url: string | null;
}

export function mapEvent(row: EventRow) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    themes: row.themes ?? [],
    ageMin: row.age_min,
    ageMax: row.age_max,
    ageLabel: row.age_label,
    price: row.price,
    cost: row.cost,
    level: row.level,
    format: row.format,
    eventDate: row.event_date,
    deadlineDate: row.deadline_date,
    place: row.place,
    short: row.short_desc,
    description: row.description,
    instagram: row.instagram,
    registrationUrl: row.registration_url,
    isPast: row.is_past,
    imageUrl: row.image_url
  };
}

export interface NewsRow {
  id: string;
  title: string;
  event_date: string;
  short_desc: string;
}

export function mapNews(row: NewsRow) {
  return {
    id: row.id,
    title: row.title,
    date: row.event_date,
    short: row.short_desc
  };
}

export interface MaterialRow {
  id: string;
  track: string;
  title: string;
  meta: string;
  body: string[];
  sort_order: number;
}

export function mapMaterial(row: MaterialRow) {
  return {
    id: row.id,
    track: row.track,
    title: row.title,
    meta: row.meta,
    body: row.body ?? [],
    sortOrder: row.sort_order
  };
}

export interface ProfileRow {
  id: string;
  username: string;
  name: string;
  last_name: string;
  birth_date: string | null;
  email: string | null;
  avatar_url: string | null;
  theme: 'light' | 'dark';
  notif_opt_in: boolean;
  name_changed_at: string | null;
  username_changed_at: string | null;
}

export function mapProfile(row: ProfileRow) {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    lastName: row.last_name,
    birthDate: row.birth_date,
    email: row.email,
    avatarUrl: row.avatar_url,
    theme: row.theme,
    notifOptIn: row.notif_opt_in,
    nameChangedAt: row.name_changed_at,
    usernameChangedAt: row.username_changed_at
  };
}

export interface SubmissionRow {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export function mapSubmission(row: SubmissionRow) {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    createdAt: row.created_at
  };
}
