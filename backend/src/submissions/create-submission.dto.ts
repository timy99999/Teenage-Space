import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { IsLooseUrl } from '../common/url';
import { ExtraLinkDto } from '../common/extra-link.dto';

export class CreateSubmissionDto {
  @IsString()
  title!: string;

  @IsLooseUrl()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  category?: string | null;

  @IsOptional()
  @IsArray()
  themes?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  ageMin?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  ageMax?: number | null;

  @IsOptional()
  @IsString()
  format?: string | null;

  @IsOptional()
  @IsIn(['free', 'paid'])
  price?: 'free' | 'paid' | null;

  @IsOptional()
  @IsString()
  cost?: string | null;

  @IsOptional()
  @IsBoolean()
  charity?: boolean;

  @IsOptional()
  @IsIn(['local', 'intl'])
  level?: 'local' | 'intl' | null;

  @IsOptional()
  @IsString()
  eventDate?: string | null;

  @IsOptional()
  @IsString()
  eventDateEnd?: string | null;

  @IsOptional()
  @IsString()
  eventTime?: string | null;

  @IsOptional()
  @IsString()
  deadlineDate?: string | null;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsLooseUrl()
  registrationUrl?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraLinkDto)
  extraLinks?: ExtraLinkDto[];

  @IsOptional()
  @IsString()
  instagram?: string | null;

  @IsOptional()
  @IsString()
  telegram?: string | null;

  @IsOptional()
  @IsString()
  whatsapp?: string | null;
}
