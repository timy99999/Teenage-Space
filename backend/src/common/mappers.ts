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
  charity: boolean;
  level: 'local' | 'intl';
  format: string;
  event_date: string | null;
  event_date_end: string | null;
  event_time: string | null;
  deadline_date: string | null;
  place: string;
  audience: string | null;
  short_desc: string;
  description: string;
  instagram: string | null;
  registration_url: string | null;
  extra_link_title: string | null;
  extra_link_url: string | null;
  telegram: string | null;
  is_past: boolean;
  archived: boolean;
  image_url: string | null;
  created_at: string;
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
    charity: row.charity,
    level: row.level,
    format: row.format,
    eventDate: row.event_date,
    eventDateEnd: row.event_date_end,
    eventTime: row.event_time,
    deadlineDate: row.deadline_date,
    place: row.place,
    audience: row.audience,
    short: row.short_desc,
    description: row.description,
    instagram: row.instagram,
    registrationUrl: row.registration_url,
    extraLinkTitle: row.extra_link_title,
    extraLinkUrl: row.extra_link_url,
    telegram: row.telegram,
    isPast: row.is_past,
    archived: row.archived,
    imageUrl: row.image_url
  };
}

export interface NewsRow {
  id: string;
  title: string;
  event_date: string;
  short_desc: string;
  image_url: string | null;
  link_title: string | null;
  link_url: string | null;
}

export function mapNews(row: NewsRow) {
  return {
    id: row.id,
    title: row.title,
    date: row.event_date,
    short: row.short_desc,
    imageUrl: row.image_url,
    linkTitle: row.link_title,
    linkUrl: row.link_url
  };
}

export interface EducationTrackRow {
  id: string;
  title: string;
  intro: string;
  sort_order: number;
}

export function mapEducationTrack(row: EducationTrackRow) {
  return {
    id: row.id,
    title: row.title,
    intro: row.intro,
    sortOrder: row.sort_order
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

export type AdminPerms = Record<string, boolean>;

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
  policy_accepted_at: string | null;
  created_at: string;
  role: 'user' | 'admin' | 'super_admin';
  is_banned: boolean;
  admin_perms: AdminPerms | null;
  ban_expires_at: string | null;
  ban_reason: string | null;
  banned_at: string | null;
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
    policyAcceptedAt: row.policy_accepted_at,
    role: row.role,
    isBanned: row.is_banned,
    adminPerms: row.admin_perms ?? {}
  };
}

export function mapAdminUser(row: ProfileRow) {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    lastName: row.last_name,
    email: row.email,
    avatarUrl: row.avatar_url,
    birthDate: row.birth_date,
    createdAt: row.created_at,
    role: row.role,
    isBanned: row.is_banned,
    adminPerms: row.admin_perms ?? {},
    banExpiresAt: row.ban_expires_at,
    banReason: row.ban_reason,
    bannedAt: row.banned_at
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
  category: string | null;
  themes: string[];
  age_min: number | null;
  age_max: number | null;
  format: string | null;
  price: 'free' | 'paid' | null;
  cost: string | null;
  charity: boolean;
  level: 'local' | 'intl' | null;
  event_date: string | null;
  event_date_end: string | null;
  event_time: string | null;
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
    category: row.category,
    themes: row.themes ?? [],
    ageMin: row.age_min,
    ageMax: row.age_max,
    format: row.format,
    price: row.price,
    cost: row.cost,
    charity: row.charity,
    level: row.level,
    eventDate: row.event_date,
    eventDateEnd: row.event_date_end,
    eventTime: row.event_time,
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
