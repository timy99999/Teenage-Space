import { IsBoolean, IsIn, IsUUID } from 'class-validator';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;

export class HeartbeatDto {
  @IsUUID()
  sessionId!: string;

  @IsIn(DEVICE_TYPES)
  deviceType!: 'mobile' | 'tablet' | 'desktop';

  @IsBoolean()
  isLoggedIn!: boolean;
}
