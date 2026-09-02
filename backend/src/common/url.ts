import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

/**
 * Normalizes a user-entered link:
 *  - trims surrounding whitespace / stray newlines from copy-paste
 *  - turns an empty string into null (so @IsOptional() skips it)
 *  - leaves anything with an explicit scheme (https://, mailto:, tg:, //cdn…) untouched
 *  - otherwise assumes https:// so a bare "example.com/x" still renders as a working href
 */
export function normalizeUrl(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith('//')) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Permissive replacement for @IsUrl: accepts any non-empty string as a link and
 * normalizes it. We only need it to be a string here — the value is rendered as an
 * <a href> on the client, never dereferenced by the server.
 */
export function IsLooseUrl() {
  return applyDecorators(
    Transform(({ value }) => normalizeUrl(value)),
    IsString(),
  );
}
