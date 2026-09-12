import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('news').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('News item not found');
    return mapNews(data as NewsRow);
  }
}
