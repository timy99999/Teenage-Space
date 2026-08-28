import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfileRow, mapProfile } from '../common/mappers';

// Long enough to open Telegram and tap Start, short enough that a token pasted into a
// group chat by mistake is worthless by the time anyone notices it.
const TOKEN_TTL_MS = 15 * 60 * 1000;

export interface TelegramLinkRow {
  telegram_id: number;
  user_id: string;
  telegram_username: string | null;
  linked_at: string;
}

/**
 * Owns the optional Telegram <-> Teenage Space account link.
 *
 * Direction matters: the link is always *started* from the site by a signed-in user
 * (so we know who they are), and only *completed* by the bot. The bot can never claim
 * an account on its own — it can only redeem a token the site handed out.
 */
@Injectable()
export class TelegramLinkService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly config: ConfigService
  ) {}

  /** Site side: mint a one-time deep link for the signed-in user. */
  async createToken(userId: string) {
    const botUsername = this.botUsername;
    if (!botUsername) throw new ServiceUnavailableException('TELEGRAM_BOT_USERNAME is not configured');

    // base64url keeps the token safe inside a t.me ?start= parameter, which only
    // accepts A-Z a-z 0-9 _ and -.
    const token = randomBytes(24).toString('base64url');
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    const { error } = await this.supabase.client
      .from('telegram_link_tokens')
      .insert({ token, user_id: userId, expires_at: expiresAt });
    if (error) throw error;

    return { deepLink: `https://t.me/${botUsername}?start=${token}`, expiresAt };
  }

  private get botUsername(): string | null {
    return this.config.get<string>('TELEGRAM_BOT_USERNAME')?.replace(/^@/, '') || null;
  }

  /**
   * Site side: is this account linked, and to whom. `available` is false until the bot
   * is configured, so the profile page can hide the row instead of offering a button
   * that can only fail.
   */
  async status(userId: string) {
    const available = this.botUsername !== null;
    const { data, error } = await this.supabase.client
      .from('telegram_links')
      .select('telegram_id, telegram_username, linked_at')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return { available, linked: false as const };
    return {
      available,
      linked: true as const,
      telegramId: String(data.telegram_id),
      telegramUsername: data.telegram_username,
      linkedAt: data.linked_at
    };
  }

  async unlinkByUser(userId: string) {
    const { error } = await this.supabase.client.from('telegram_links').delete().eq('user_id', userId);
    if (error) throw error;
  }

  async unlinkByTelegramId(telegramId: number) {
    const { error } = await this.supabase.client.from('telegram_links').delete().eq('telegram_id', telegramId);
    if (error) throw error;
  }

  /** Bot side: redeem a token from /start <token>. */
  async confirm(token: string, telegramId: number, telegramUsername?: string) {
    const { data: row, error } = await this.supabase.client
      .from('telegram_link_tokens')
      .select('token, user_id, expires_at, used_at')
      .eq('token', token)
      .maybeSingle();
    if (error) throw error;
    if (!row) throw new BadRequestException('Ссылка недействительна');
    if (row.used_at) throw new BadRequestException('Ссылка уже использована');
    if (new Date(row.expires_at).getTime() < Date.now()) throw new BadRequestException('Ссылка истекла');

    // A person may re-link a different Telegram account: drop whatever they had before,
    // and take over this telegram_id from any other account that held it.
    await this.unlinkByUser(row.user_id);
    await this.unlinkByTelegramId(telegramId);

    const { error: linkError } = await this.supabase.client.from('telegram_links').insert({
      telegram_id: telegramId,
      user_id: row.user_id,
      telegram_username: telegramUsername ?? null
    });
    if (linkError) throw linkError;

    // Burn the token only after the link succeeded, so a failure here leaves the user
    // able to retry with the same deep link.
    const { error: burnError } = await this.supabase.client
      .from('telegram_link_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);
    if (burnError) throw burnError;

    return this.profileFor(row.user_id);
  }

  /** Bot side: which account (if any) this chat speaks for. */
  async resolveUserId(telegramId: number): Promise<string | null> {
    const { data, error } = await this.supabase.client
      .from('telegram_links')
      .select('user_id')
      .eq('telegram_id', telegramId)
      .maybeSingle();
    if (error) throw error;
    return (data?.user_id as string | undefined) ?? null;
  }

  async profileFor(userId: string) {
    const { data, error } = await this.supabase.client.from('profiles').select('*').eq('id', userId).maybeSingle();
    if (error) throw error;
    return data ? mapProfile(data as ProfileRow) : null;
  }
}
