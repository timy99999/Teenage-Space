import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { EducationTrackRow, mapEducationTrack, MaterialRow, mapMaterial } from '../common/mappers';

@Injectable()
export class EducationService {
  constructor(private readonly supabase: SupabaseService) {}

  async listTracks() {
    const { data, error } = await this.supabase.client.from('education_tracks').select('*').order('sort_order');
    if (error) throw error;
    return (data as EducationTrackRow[]).map(mapEducationTrack);
  }

  async byTrack(track: string) {
    const { data: trackRow, error: trackError } = await this.supabase.client
      .from('education_tracks')
      .select('*')
      .eq('id', track)
      .maybeSingle();
    if (trackError) throw trackError;
    if (!trackRow) throw new NotFoundException('Track not found');

    const { data, error } = await this.supabase.client
      .from('materials')
      .select('*')
      .eq('track', track)
      .order('sort_order', { ascending: true });
    if (error) throw error;

    return {
      ...mapEducationTrack(trackRow as EducationTrackRow),
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
