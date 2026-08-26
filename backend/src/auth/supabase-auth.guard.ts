import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

export interface RequestProfile {
  role: 'user' | 'admin' | 'super_admin';
  is_banned: boolean;
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

    const { data: profileRow } = await this.supabase.client
      .from('profiles')
      .select('role, is_banned')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileRow?.is_banned) throw new ForbiddenException('Аккаунт заблокирован');

    req.user = data.user;
    req.profile = { role: profileRow?.role ?? 'user', is_banned: profileRow?.is_banned ?? false };
    return true;
  }
}
