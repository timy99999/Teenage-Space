import { IsBoolean, IsIn, IsString, IsUUID, MaxLength } from 'class-validator';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;
const TARGET_TYPES = ['event', 'news'] as const;

export class TrackCardViewDto {
  @IsUUID()
  sessionId!: string;

  @IsIn(DEVICE_TYPES)
  deviceType!: 'mobile' | 'tablet' | 'desktop';

  @IsBoolean()
  isLoggedIn!: boolean;

  @IsIn(TARGET_TYPES)
  targetType!: 'event' | 'news';

  @IsString()
  @MaxLength(100)
  targetId!: string;
}
