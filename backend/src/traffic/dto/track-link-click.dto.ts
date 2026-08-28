import { IsBoolean, IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;
const TARGET_TYPES = ['event', 'news'] as const;
const LINK_KINDS = ['registration', 'instagram', 'telegram', 'extra_link', 'news_link'] as const;

export class TrackLinkClickDto {
  @IsUUID()
  sessionId!: string;

  @IsIn(DEVICE_TYPES)
  deviceType!: 'mobile' | 'tablet' | 'desktop';

  @IsBoolean()
  isLoggedIn!: boolean;

  @IsIn(LINK_KINDS)
  linkKind!: 'registration' | 'instagram' | 'telegram' | 'extra_link' | 'news_link';

  @IsOptional()
  @IsIn(TARGET_TYPES)
  targetType?: 'event' | 'news';

  @IsOptional()
  @IsString()
  @MaxLength(100)
  targetId?: string;
}
