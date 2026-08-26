import { IsBoolean, IsIn, IsOptional, IsString, IsUrl, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @Matches(/^[A-Za-z0-9_]{4,15}$/, { message: 'Username: латиница, цифры и _, от 4 до 15 символов' })
  username?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  avatarUrl?: string;

  @IsOptional()
  @IsIn(['light', 'dark'])
  theme?: 'light' | 'dark';

  @IsOptional()
  notifOptIn?: boolean;

  @IsOptional()
  @IsBoolean()
  policyAccepted?: boolean;
}
