import { ConflictException, Injectable } from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfileRow, mapProfile } from '../common/mappers';
import { UpdateProfileDto } from './update-profile.dto';

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
    const patch: Record<string, unknown> = {};
    if (dto.username !== undefined) patch.username = dto.username;
    if (dto.name !== undefined) patch.name = dto.name;
    if (dto.birthDate !== undefined) patch.birth_date = dto.birthDate;
    if (dto.theme !== undefined) patch.theme = dto.theme;
    if (dto.notifOptIn !== undefined) patch.notif_opt_in = dto.notifOptIn;

    await this.getOrCreate(user);

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
}
