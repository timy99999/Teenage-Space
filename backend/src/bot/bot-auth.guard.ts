import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';
import type { Request } from 'express';

/**
 * Machine-to-machine auth for the Telegram agent ("Барс", see bot/).
 *
 * Every other protected route in this API is guarded by SupabaseAuthGuard and needs a
 * real end-user JWT, which a bot process has no way to obtain. These routes instead
 * carry a shared secret and resolve the acting user from the Telegram link table.
 *
 * Unlike SupabaseService (which only warns on missing env), a missing secret here is
 * fatal: silently allowing everyone through would expose profile data and writes.
 */
@Injectable()
export class BotAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>('BOT_API_SECRET');
    if (!expected) throw new ServiceUnavailableException('BOT_API_SECRET is not configured');

    const provided = context.switchToHttp().getRequest<Request>().header('x-bot-secret');
    if (!provided || !secretsMatch(provided, expected)) {
      throw new UnauthorizedException('Invalid bot secret');
    }
    return true;
  }
}

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on a length mismatch, so that has to be checked first;
  // the length of the secret is not the part worth hiding.
  return a.length === b.length && timingSafeEqual(a, b);
}
