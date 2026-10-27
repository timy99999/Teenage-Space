import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHash } from 'node:crypto';
import type { Request } from 'express';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

// A validated token is cached for this long so that one actively-clicking user
// stops hitting GoTrue (auth.getUser) on every single request — that round trip
// per request is the free-tier throughput ceiling. Kept short so a revoked
// session stops working within seconds.
const AUTH_CACHE_TTL_MS = 30_000;

/** Reads the `exp` claim without verifying the signature — used only to make sure
 *  a cached token never outlives the token itself. */
function jwtExpiryMs(token: string): number | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as { exp?: unknown };
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function bearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  return header?.startsWith('Bearer ') ? header.slice(7) : null;
}

/** Token -> Supabase user, with the shared cache. Used both by the strict
 *  SupabaseAuthGuard and by the traffic pipeline's OptionalAuthGuard, so a
 *  signed-in visitor's tracking calls ride the same warm cache entry as their
 *  regular API calls. */
@Injectable()
export class AuthTokenService {
  constructor(
    private readonly supabase: SupabaseService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async resolveUser(token: string): Promise<User> {
    const key = `auth:user:${createHash('sha256').update(token).digest('hex')}`;
    const cached = await this.cache.get<User>(key);
    if (cached) return cached;

    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) throw new UnauthorizedException('Invalid or expired session');

    // Never let the cache entry outlive the token; cap it at AUTH_CACHE_TTL_MS.
    const expiryMs = jwtExpiryMs(token);
    const ttl = Math.min(AUTH_CACHE_TTL_MS, expiryMs ? expiryMs - Date.now() : AUTH_CACHE_TTL_MS);
    if (ttl > 0) await this.cache.set(key, data.user, ttl);
    return data.user;
  }

  /** Never throws: a missing, malformed or expired token just means "anonymous". */
  async resolveOptionalUserId(req: Request): Promise<string | null> {
    const token = bearerToken(req);
    if (!token) return null;
    try {
      const user = await this.resolveUser(token);
      return user.id;
    } catch {
      return null;
    }
  }
}
