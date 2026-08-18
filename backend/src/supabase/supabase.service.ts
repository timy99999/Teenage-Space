import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  readonly client: SupabaseClient;

  constructor(config: ConfigService) {
    const url = config.get<string>('SUPABASE_URL');
    const serviceKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) {
      // eslint-disable-next-line no-console
      console.warn(
        'SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. Backend will fail on any Supabase call until backend/.env is configured.'
      );
    }
    this.client = createClient(url ?? '', serviceKey ?? '', {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
}
