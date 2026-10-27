import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;

/** No isLoggedIn field, unlike the older tracking DTOs: identity now comes from
 *  the bearer token, so a client-supplied flag would be both redundant and
 *  untrustworthy. */
export class TrackFeatureDto {
  @IsUUID()
  sessionId!: string;

  @IsIn(DEVICE_TYPES)
  deviceType!: 'mobile' | 'tablet' | 'desktop';

  /** A key from traffic_feature_catalog. The FK on traffic_events.feature is what
   *  actually rejects unknown keys, so the list lives in one place (the catalog)
   *  instead of being mirrored here; the frontend's FeatureKey union catches typos
   *  at compile time. */
  @IsString()
  @MaxLength(40)
  feature!: string;

  /** Optional per-feature extra — a search query, which filter, which article.
   *  Its meaning per feature is documented in traffic_feature_catalog.detail_meaning. */
  @IsOptional()
  @IsString()
  @MaxLength(120)
  detail?: string;
}
