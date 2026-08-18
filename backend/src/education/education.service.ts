import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MaterialRow, mapMaterial } from '../common/mappers';

const TRACK_INTRO: Record<string, string> = {
  'edu-nct': 'Материалы, разборы и расписание бесплатных занятий по НЦТ/ОРТ',
  'edu-abroad': 'Как поступать за границу: сроки, документы, стипендии'
};

@Injectable()
export class EducationService {
  constructor(private readonly supabase: SupabaseService) {}

  async byTrack(track: string) {
    const { data, error } = await this.supabase.client
      .from('materials')
      .select('*')
      .eq('track', track)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return {
      intro: TRACK_INTRO[track] ?? '',
      items: (data as MaterialRow[]).map(mapMaterial)
    };
  }

  async article(id: string) {
    const { data, error } = await this.supabase.client.from('materials').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('Article not found');
    return mapMaterial(data as MaterialRow);
  }
}
