import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import type { AdminPerms } from '../common/mappers';

export interface RequestProfile {
  role: 'user' | 'admin' | 'super_admin';
  is_banned: boolean;
  adminPerms: AdminPerms;
}

export interface AuthedRequest extends Request {
  user: User;
  profile: RequestProfile;
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthedRequest>();
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException('Missing bearer token');

    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) throw new UnauthorizedException('Invalid or expired session');

    // select('*') keeps this resilient if a new column (admin_perms,
    // ban_expires_at) has not been migrated onto the live DB yet — a named
    // select of a missing column errors and would strip everyone's role.
    const { data: profileRow } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    let banned = !!profileRow?.is_banned;
    if (banned && profileRow?.ban_expires_at && new Date(profileRow.ban_expires_at as string).getTime() <= Date.now()) {
      // Timed ban has elapsed — lift it and let the request through.
      await this.supabase.client
        .from('profiles')
        .update({ is_banned: false, ban_expires_at: null, ban_reason: null, banned_at: null })
        .eq('id', data.user.id);
      banned = false;
    }
    if (banned) throw new ForbiddenException('Аккаунт заблокирован');

    req.user = data.user;
    req.profile = {
      role: profileRow?.role ?? 'user',
      is_banned: false,
      adminPerms: (profileRow?.admin_perms as AdminPerms) ?? {}
    };
    return true;
  }
}
