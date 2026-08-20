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
  image_url: string | null;
}

export function mapNews(row: NewsRow) {
  return {
    id: row.id,
    title: row.title,
    date: row.event_date,
    short: row.short_desc,
    imageUrl: row.image_url
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
  role: 'user' | 'admin';
  is_banned: boolean;
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
    usernameChangedAt: row.username_changed_at,
    role: row.role,
    isBanned: row.is_banned
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

export interface SubmissionAdminRow extends SubmissionRow {
  user_id: string;
  categories: string[];
  themes: string[];
  ages: string[];
  format: string[];
  price: 'free' | 'paid' | null;
  cost: string | null;
  charity: boolean;
  level: 'local' | 'intl' | null;
  event_date: string | null;
  deadline_date: string | null;
  address: string | null;
  audience: string | null;
  description: string | null;
  registration_url: string | null;
  extra_link_title: string | null;
  extra_link_url: string | null;
  instagram: string | null;
  telegram: string | null;
  whatsapp: string | null;
  published_event_id: string | null;
  image_url: string | null;
}

export function mapSubmissionAdmin(row: SubmissionAdminRow) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    categories: row.categories ?? [],
    themes: row.themes ?? [],
    ages: row.ages ?? [],
    format: row.format ?? [],
    price: row.price,
    cost: row.cost,
    charity: row.charity,
    level: row.level,
    eventDate: row.event_date,
    deadlineDate: row.deadline_date,
    address: row.address,
    audience: row.audience,
    description: row.description,
    registrationUrl: row.registration_url,
    extraLinkTitle: row.extra_link_title,
    extraLinkUrl: row.extra_link_url,
    instagram: row.instagram,
    telegram: row.telegram,
    whatsapp: row.whatsapp,
    status: row.status,
    createdAt: row.created_at,
    publishedEventId: row.published_event_id,
    imageUrl: row.image_url
  };
}
