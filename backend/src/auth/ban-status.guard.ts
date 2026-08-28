import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { AuthedRequest } from './supabase-auth.guard';
import { SupabaseService } from '../supabase/supabase.service';

/**
 * Verifies the Supabase session but — unlike SupabaseAuthGuard — does NOT reject
 * banned accounts. Used only by GET /auth/ban-status so a banned user can still
 * learn why and for how long they are blocked.
 */
@Injectable()
export class BanStatusGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthedRequest>();
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException('Missing bearer token');

    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) throw new UnauthorizedException('Invalid or expired session');

    req.user = data.user;
    return true;
  }
}
