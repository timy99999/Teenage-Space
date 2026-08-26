import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';

interface StorageStatRow {
  bucket_id: string;
  file_count: number;
  total_bytes: number;
}

@Injectable()
export class CapacityService {
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
      }
    };
  }
}
