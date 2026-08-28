import { IsBoolean, IsIn, IsString, IsUUID, MaxLength } from 'class-validator';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;

export class TrackViewDto {
  @IsUUID()
  sessionId!: string;

  @IsIn(DEVICE_TYPES)
  deviceType!: 'mobile' | 'tablet' | 'desktop';

  @IsBoolean()
  isLoggedIn!: boolean;

  @IsString()
  @MaxLength(200)
  path!: string;
}
