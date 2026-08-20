import { IsArray, IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];

  @IsOptional()
  @IsArray()
  themes?: string[];

  @IsOptional()
  @IsArray()
  ages?: string[];

  @IsOptional()
  @IsArray()
  format?: string[];

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
  @IsString()
  registrationUrl?: string | null;

  @IsOptional()
  @IsString()
  extraLinkTitle?: string | null;

  @IsOptional()
  @IsString()
  extraLinkUrl?: string | null;

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
