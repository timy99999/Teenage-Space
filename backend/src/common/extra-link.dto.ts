import { IsOptional, IsString } from 'class-validator';
import { IsLooseUrl } from './url';

/** One custom "title + URL" button, repeatable — see `extraLinks` on the
 *  event/submission DTOs. `title` is optional; the client falls back to a
 *  generic label ("Ссылка") when it's blank. */
export class ExtraLinkDto {
  @IsOptional()
  @IsString()
  title?: string | null;

  @IsLooseUrl()
  url!: string;
}
