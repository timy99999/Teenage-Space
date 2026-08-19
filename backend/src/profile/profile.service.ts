import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfileRow, mapProfile } from '../common/mappers';
import { UpdateProfileDto } from './update-profile.dto';

const NAME_CHANGE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function assertCooldownElapsed(fieldLabel: string, changedAt: string | null) {
  if (!changedAt) return;
  const nextAllowed = new Date(changedAt).getTime() + NAME_CHANGE_COOLDOWN_MS;
  if (Date.now() < nextAllowed) {
    const date = new Date(nextAllowed).toLocaleDateString('ru-RU');
    throw new BadRequestException(`${fieldLabel} можно менять раз в неделю. Следующее изменение будет доступно ${date}`);
  }
}

@Injectable()
export class ProfileService {
  constructor(private readonly supabase: SupabaseService) {}

  async getOrCreate(user: User) {
    const { data, error } = await this.supabase.client.from('profiles').select('*').eq('id', user.id).maybeSingle();
    if (error) throw error;
    if (data) return mapProfile(data as ProfileRow);

    const defaultUsername = `user_${user.id.slice(0, 8)}`;
    const { data: created, error: createError } = await this.supabase.client
      .from('profiles')
      .insert({
        id: user.id,
        username: defaultUsername,
        name: user.user_metadata?.name ?? '',
        email: user.email,
        theme: 'light',
        notif_opt_in: false
      })
      .select('*')
      .single();
    if (createError) throw createError;
    return mapProfile(created as ProfileRow);
  }

  async update(user: User, dto: UpdateProfileDto) {
    const current = await this.getOrCreate(user);
    const now = new Date();
    const patch: Record<string, unknown> = {};

    if (dto.name !== undefined && dto.name !== current.name) {
      assertCooldownElapsed('Имя', current.nameChangedAt);
      patch.name = dto.name;
      patch.name_changed_at = now.toISOString();
    }
    if (dto.username !== undefined && dto.username !== current.username) {
      assertCooldownElapsed('Username', current.usernameChangedAt);
      patch.username = dto.username;
      patch.username_changed_at = now.toISOString();
    }
    if (dto.lastName !== undefined) patch.last_name = dto.lastName;
    if (dto.avatarUrl !== undefined) patch.avatar_url = dto.avatarUrl;
    if (dto.birthDate !== undefined) patch.birth_date = dto.birthDate || null;
    if (dto.theme !== undefined) patch.theme = dto.theme;
    if (dto.notifOptIn !== undefined) patch.notif_opt_in = dto.notifOptIn;

    const { data, error } = await this.supabase.client
      .from('profiles')
      .update(patch)
      .eq('id', user.id)
      .select('*')
      .single();
    if (error) {
      if (error.code === '23505') throw new ConflictException('Этот Username уже занят');
      throw error;
    }
    return mapProfile(data as ProfileRow);
  }

  async remove(user: User) {
    const { error } = await this.supabase.client.auth.admin.deleteUser(user.id);
    if (error) throw error;
  }
}
