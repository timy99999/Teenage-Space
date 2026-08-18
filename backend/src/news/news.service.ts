import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { NewsRow, mapNews } from '../common/mappers';

@Injectable()
export class NewsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list() {
    const { data, error } = await this.supabase.client
      .from('news')
      .select('*')
      .order('event_date', { ascending: false });
    if (error) throw error;
    return (data as NewsRow[]).map(mapNews);
  }
}
