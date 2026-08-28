import { IsObject } from 'class-validator';

export const ADMIN_PERM_KEYS = [
  'moderation',
  'publish_event',
  'publish_news',
  'archive',
  'education',
  'users',
  'analytics',
  'card_edit'
] as const;

export type AdminPermKey = (typeof ADMIN_PERM_KEYS)[number];

export class SetPermsDto {
  @IsObject()
  perms!: Record<string, boolean>;
}
