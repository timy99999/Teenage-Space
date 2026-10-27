import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import type { Request } from 'express';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthTokenService, bearerToken } from './auth-token.service';
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

// The caller's profile row is cached for this long so that one actively-clicking
// user stops hitting Postgres (profiles select) on every single request — that
// round trip per request is the free-tier throughput ceiling. Kept short so a
// role change or a ban still takes effect within seconds; admin mutations also
// call cache.clear() (see users-admin.service.ts), so those land on the next
// request. Token validation is cached separately, in AuthTokenService.
const AUTH_CACHE_TTL_MS = 30_000;

interface CachedProfile {
  role: 'user' | 'admin' | 'super_admin';
  is_banned: boolean;
  ban_expires_at: string | null;
  admin_perms: AdminPerms;
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly authToken: AuthTokenService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthedRequest>();
    const token = bearerToken(req);
    if (!token) throw new UnauthorizedException('Missing bearer token');

    const user = await this.authToken.resolveUser(token);
    const profile = await this.resolveProfile(user.id);

    let banned = profile.is_banned;
    if (banned && profile.ban_expires_at && new Date(profile.ban_expires_at).getTime() <= Date.now()) {
      // Timed ban has elapsed — lift it on the DB and drop the now-stale cache entry.
      await this.supabase.client
        .from('profiles')
        .update({ is_banned: false, ban_expires_at: null, ban_reason: null, banned_at: null })
        .eq('id', user.id);
      await this.cache.del(this.profileKey(user.id));
      banned = false;
    }
    if (banned) throw new ForbiddenException('Аккаунт заблокирован');

    req.user = user;
    req.profile = {
      role: profile.role,
      is_banned: false,
      adminPerms: profile.admin_perms
    };
    return true;
  }

  private profileKey(userId: string): string {
    return `auth:profile:${userId}`;
  }

  private async resolveProfile(userId: string): Promise<CachedProfile> {
    const key = this.profileKey(userId);
    const cached = await this.cache.get<CachedProfile>(key);
    if (cached) return cached;

    // select('*') keeps this resilient if a new column (admin_perms,
    // ban_expires_at) has not been migrated onto the live DB yet — a named
    // select of a missing column errors and would strip everyone's role.
    const { data: row } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    const profile: CachedProfile = {
      role: (row?.role as CachedProfile['role']) ?? 'user',
      is_banned: !!row?.is_banned,
      ban_expires_at: (row?.ban_expires_at as string | null) ?? null,
      admin_perms: (row?.admin_perms as AdminPerms) ?? {}
    };
    await this.cache.set(key, profile, AUTH_CACHE_TTL_MS);
    return profile;
  }
}
