import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';

interface StorageStatRow {
  bucket_id: string;
  file_count: number;
  total_bytes: number;
}

interface UserStatRow {
  registered_total: number;
  banned_total: number;
  user_data_bytes: number;
  online_now: number;
  peak_concurrent_today: number;
}

@Injectable()
export class CapacityService {
  private readonly logger = new Logger(CapacityService.name);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly config: ConfigService
  ) {}

  async get() {
    const { data: dbSizeBytes, error: dbError } = await this.supabase.client.rpc('get_database_size');
    if (dbError) throw dbError;

    const { data: storageRows, error: storageError } = await this.supabase.client.rpc('get_storage_stats');
    if (storageError) throw storageError;

    const buckets = (storageRows as StorageStatRow[]).map((r) => ({
      bucket: r.bucket_id,
      fileCount: Number(r.file_count),
      bytes: Number(r.total_bytes)
    }));
    const storageUsedBytes = buckets.reduce((sum, b) => sum + b.bytes, 0);

    const dbLimitBytes = this.config.get<number>('DB_SIZE_LIMIT_MB', 500) * 1024 * 1024;
    const storageLimitBytes = this.config.get<number>('STORAGE_LIMIT_MB', 1024) * 1024 * 1024;

    const postsBucket = buckets.find((b) => b.bucket === 'posts');
    const avgPostBytes = postsBucket && postsBucket.fileCount > 0 ? postsBucket.bytes / postsBucket.fileCount : null;
    const remainingStorageBytes = Math.max(0, storageLimitBytes - storageUsedBytes);
    const estimatedRemainingPosts = avgPostBytes ? Math.floor(remainingStorageBytes / avgPostBytes) : null;

    const remainingDbBytes = Math.max(0, dbLimitBytes - Number(dbSizeBytes));
    const avatarsBucket = buckets.find((b) => b.bucket === 'avatars');
    const avgAvatarBytes =
      avatarsBucket && avatarsBucket.fileCount > 0 ? avatarsBucket.bytes / avatarsBucket.fileCount : null;

    return {
      database: {
        usedBytes: Number(dbSizeBytes),
        limitBytes: dbLimitBytes
      },
      storage: {
        usedBytes: storageUsedBytes,
        limitBytes: storageLimitBytes,
        buckets
      },
      capacityEstimate: {
        avgPostBytes,
        estimatedRemainingPosts
      },
      users: await this.userCapacity(remainingDbBytes, remainingStorageBytes, avgAvatarBytes)
    };
  }

  /**
   * "How many more users can we take, and how many are here right now." Best-effort:
   * the underlying RPC ships in a migration that may not be live yet (CI applies it on
   * push), so a failure here must not blank the whole capacity page — return null and
   * let the frontend hide the section.
   */
  private async userCapacity(
    remainingDbBytes: number,
    remainingStorageBytes: number,
    avgAvatarBytes: number | null
  ) {
    const { data, error } = await this.supabase.client.rpc('get_user_capacity_stats');
    if (error || !data || (data as UserStatRow[]).length === 0) {
      if (error) this.logger.warn(`get_user_capacity_stats unavailable: ${error.message}`);
      return null;
    }
    const row = (data as UserStatRow[])[0];
    const registeredTotal = Number(row.registered_total);
    const userDataBytes = Number(row.user_data_bytes);

    // Below a handful of accounts every table still sits at its empty-page minimum,
    // so the measured average is meaningless — fall back to a flat per-user estimate
    // (profile + auth rows + a little favorites/ratings/submissions), and only trust
    // the real average once there is enough data for it to mean something.
    const flatBytesPerUser = this.config.get<number>('DB_BYTES_PER_USER', 5120);
    const bytesPerUser =
      registeredTotal >= 25 ? Math.max(flatBytesPerUser, userDataBytes / registeredTotal) : flatBytesPerUser;

    const mauPlanLimit = this.config.get<number>('AUTH_MAU_LIMIT', 50000);
    const maxByDatabase = registeredTotal + Math.floor(remainingDbBytes / bytesPerUser);
    const maxByAvatarStorage = avgAvatarBytes
      ? registeredTotal + Math.floor(remainingStorageBytes / avgAvatarBytes)
      : null;

    const limits: { key: string; value: number }[] = [
      { key: 'database', value: maxByDatabase },
      { key: 'auth-plan', value: mauPlanLimit }
    ];
    if (maxByAvatarStorage !== null) limits.push({ key: 'avatar-storage', value: maxByAvatarStorage });
    const tightest = limits.reduce((a, b) => (b.value < a.value ? b : a));

    return {
      registeredTotal,
      bannedTotal: Number(row.banned_total),
      dataUsedBytes: userDataBytes,
      bytesPerUserEstimate: Math.round(bytesPerUser),
      estimatedMaxUsers: tightest.value,
      estimatedRemainingUsers: Math.max(0, tightest.value - registeredTotal),
      limitedBy: tightest.key,
      mauPlanLimit,
      onlineNow: Number(row.online_now),
      peakConcurrentToday: Number(row.peak_concurrent_today),
      concurrentSoftLimit: this.config.get<number>('CONCURRENT_SOFT_LIMIT', 500),
      concurrentHardLimit: this.config.get<number>('CONCURRENT_HARD_LIMIT', 1500)
    };
  }
}
