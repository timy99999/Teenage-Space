import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthedRequest } from './supabase-auth.guard';
import { PERM_KEY } from './require-perm.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const perm = this.reflector.getAllAndOverride<string | undefined>(PERM_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!perm) return true;

    const req = context.switchToHttp().getRequest<AuthedRequest>();
    if (req.profile?.role === 'super_admin') return true;
    if (req.profile?.adminPerms?.[perm] === true) return true;
    throw new ForbiddenException('Нет доступа');
  }
}
