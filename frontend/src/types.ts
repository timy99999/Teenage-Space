export type PriceType = 'free' | 'paid';
export type Level = 'local' | 'intl';
export type Format = 'Личное' | 'Командное';

export interface EventItem {
  id: string;
  title: string;
  /** Primary category (first of `categories`) — kept for single-value reads. */
  category: string;
  categories: string[];
  themes: string[];
  ageMin: number;
  ageMax: number;
  ageLabel: string;
  price: PriceType;
  cost: string | null;
  charity: boolean;
  level: Level;
  format: Format;
  eventDate: string | null;
  eventDateEnd: string | null;
  eventTime: string | null;
  deadlineDate: string | null;
  place: string;
  audience: string | null;
  short: string;
  description: string;
  instagram: string | null;
  registrationUrl: string | null;
  extraLinkTitle: string | null;
  extraLinkUrl: string | null;
  organizerName: string | null;
  organizerUrl: string | null;
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

export type Role = 'user' | 'admin' | 'super_admin';

export type AdminPermKey =
  | 'moderation'
  | 'publish_event'
  | 'publish_news'
  | 'archive'
  | 'education'
  | 'users'
  | 'analytics'
  | 'card_edit';

export const ADMIN_PERMS: { key: AdminPermKey; label: string }[] = [
  { key: 'moderation', label: 'Модерация' },
  { key: 'publish_event', label: 'Опубликовать возможность' },
  { key: 'publish_news', label: 'Опубликовать новость' },
  { key: 'archive', label: 'Архив' },
  { key: 'education', label: 'Образование' },
  { key: 'users', label: 'Пользователи' },
  { key: 'analytics', label: 'Аналитика' },
  { key: 'card_edit', label: 'Редактирование карточек' }
];

export type AdminPerms = Partial<Record<AdminPermKey, boolean>>;

export type BanDuration = 'day' | 'week' | 'month' | 'forever';

export interface BanInfo {
  isBanned: boolean;
  banExpiresAt: string | null;
  banReason: string | null;
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
  policyAcceptedAt: string | null;
  role: Role;
  isBanned: boolean;
  adminPerms: AdminPerms;
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
  submitterUsername: string | null;
  submitterEmail: string | null;
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
  eventDateEnd: string | null;
  eventTime: string | null;
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
  whatsappLink: string | null;
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
  avatarUrl: string | null;
  birthDate: string | null;
  createdAt: string;
  role: Role;
  isBanned: boolean;
  adminPerms: AdminPerms;
  banExpiresAt: string | null;
  banReason: string | null;
  bannedAt: string | null;
}

export interface AdminUserDetail extends AdminUser {
  submissions: AdminSubmission[];
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

export interface Capacity {
  database: { usedBytes: number; limitBytes: number };
  storage: {
    usedBytes: number;
    limitBytes: number;
    buckets: { bucket: string; fileCount: number; bytes: number }[];
  };
  capacityEstimate: {
    avgPostBytes: number | null;
    estimatedRemainingPosts: number | null;
  };
  users: CapacityUsers | null;
}

export interface CapacityUsers {
  registeredTotal: number;
  bannedTotal: number;
  dataUsedBytes: number;
  bytesPerUserEstimate: number;
  estimatedMaxUsers: number;
  estimatedRemainingUsers: number;
  limitedBy: 'database' | 'avatar-storage' | 'auth-plan';
  mauPlanLimit: number;
  onlineNow: number;
  peakConcurrentToday: number;
  concurrentSoftLimit: number;
  concurrentHardLimit: number;
}

export interface CardViewCount {
  targetType: 'event' | 'news';
  targetId: string;
  uniqueViews: number;
}

export interface TrafficSummary {
  today: {
    pageViews: number;
    cardViews: number;
    linkClicks: number;
    uniqueSessions: number;
    loggedInSessions: number;
    guestSessions: number;
  };
  hourlyToday: { hour: number; views: number }[];
  peakHour: number | null;
  dailyTrend: { day: string; pageViews: number; cardViews: number; linkClicks: number; uniqueSessions: number }[];
  topCards: { targetType: 'event' | 'news'; targetId: string; title: string; views: number }[];
  deviceBreakdown: { deviceType: string; sessions: number }[];
  topLinks: { linkKind: string; clicks: number }[];
}

export type BarsMessageStatus = 'ok' | 'off_topic' | 'error' | 'fallback' | 'truncated';

export interface BarsChatRow {
  chatId: string;
  telegramUsername: string | null;
  name: string | null;
  userId: string | null;
  messageCount: number;
  lastActivityAt: string;
  hasError: boolean;
  offTopicCount: number;
}

export interface BarsMessage {
  role: 'user' | 'assistant';
  text: string;
  status: BarsMessageStatus;
  tools: string[];
  createdAt: string;
}

export interface BarsCredit {
  toppedUpUsd: number;
  toppedUpAt: string;
  note: string | null;
  updatedAt: string;
  spentSinceUsd: number;
  remainingUsd: number;
}

export interface BarsAnalytics {
  credit: BarsCredit | null;
  summary: {
    messages: number;
    userMessages: number;
    conversations: number;
    activeUsers: number;
    offTopic: number;
    errors: number;
    plansCreated: number;
    remindersSent: number;
    avgTurnsPerConvo: number;
  };
  tokenTotals: { promptTokens: number; outputTokens: number; thinkingTokens: number };
  daily: {
    day: string;
    turns: number;
    promptTokens: number;
    outputTokens: number;
    thinkingTokens: number;
    costUsd: number;
  }[];
  costUsd: number;
  pricingConfigured: boolean;
  tools: { tool: string; calls: number }[];
  topChats: {
    chatId: string;
    telegramUsername: string | null;
    name: string | null;
    messages: number;
    promptTokens: number;
    outputTokens: number;
    thinkingTokens: number;
  }[];
}

/**
 * One shared shape for "create/publish an event" — used identically by the
 * public submission form (PublishPage) and the admin's direct-publish/edit
 * forms. ageMin/ageMax use '' as the "field is empty while typing" state.
 */
export interface PostFormValue {
  imageUrl: string | null;
  title: string;
  categories: string[];
  themes: string[];
  ageMin: number | '';
  ageMax: number | '';
  format: string;
  price: PriceType | null;
  cost: string;
  charity: boolean;
  level: Level | null;
  eventDate: string;
  eventDateEnd: string;
  eventTime: string;
  deadlineDate: string;
  address: string;
  audience: string;
  description: string;
  organizerName: string;
  organizerUrl: string;
  registrationUrl: string;
  extraLinkTitle: string;
  extraLinkUrl: string;
  instagram: string;
  telegram: string;
}
