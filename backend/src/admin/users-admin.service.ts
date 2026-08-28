import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { SupabaseService } from '../supabase/supabase.service';
import { mapAdminUser, mapSubmissionAdmin, ProfileRow, SubmissionAdminRow } from '../common/mappers';
import { BanUserDto, BanDuration } from './dto/ban-user.dto';
import { ADMIN_PERM_KEYS } from './dto/set-perms.dto';

const BAN_MS: Record<Exclude<BanDuration, 'forever'>, number> = {
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000
};

@Injectable()
export class UsersAdminService {
  constructor(
    private readonly supabase: SupabaseService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  private async getRow(id: string): Promise<ProfileRow> {
    const { data, error } = await this.supabase.client.from('profiles').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('Пользователь не найден');
    return data as ProfileRow;
  }

  async listUsers() {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as ProfileRow[]).map(mapAdminUser);
  }

  async listAdmins() {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as ProfileRow[]).map(mapAdminUser);
  }

  async getUser(id: string) {
    const row = await this.getRow(id);
    const { data: subs, error } = await this.supabase.client
      .from('submissions')
      .select('*')
      .eq('user_id', id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return {
      ...mapAdminUser(row),
      submissions: (subs as SubmissionAdminRow[]).map(mapSubmissionAdmin)
    };
  }

  async ban(id: string, actorId: string, dto: BanUserDto) {
    if (id === actorId) throw new BadRequestException('Нельзя забанить себя');
    const row = await this.getRow(id);
    if (row.role === 'super_admin') throw new ForbiddenException('Нельзя забанить главного администратора');

    const expiresAt =
      dto.duration === 'forever' ? null : new Date(Date.now() + BAN_MS[dto.duration]).toISOString();

    const { data, error } = await this.supabase.client
      .from('profiles')
      .update({
        is_banned: true,
        ban_expires_at: expiresAt,
        ban_reason: dto.reason?.trim() || null,
        banned_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapAdminUser(data as ProfileRow);
  }

  async unban(id: string) {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .update({ is_banned: false, ban_expires_at: null, ban_reason: null, banned_at: null })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapAdminUser(data as ProfileRow);
  }

  async setRole(id: string, actorId: string, role: 'user' | 'admin') {
    if (id === actorId) throw new BadRequestException('Нельзя изменить собственную роль');
    const row = await this.getRow(id);
    if (row.role === 'super_admin') throw new ForbiddenException('Роль главного администратора менять нельзя');

    const { data, error } = await this.supabase.client
      .from('profiles')
      .update({ role, admin_perms: {} })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapAdminUser(data as ProfileRow);
  }

  async setPerms(id: string, perms: Record<string, boolean>) {
    const row = await this.getRow(id);
    if (row.role !== 'admin') throw new BadRequestException('Права можно настраивать только у администратора');

    const clean: Record<string, boolean> = {};
    for (const key of ADMIN_PERM_KEYS) clean[key] = perms[key] === true;

    const { data, error } = await this.supabase.client
      .from('profiles')
      .update({ admin_perms: clean })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapAdminUser(data as ProfileRow);
  }
}
