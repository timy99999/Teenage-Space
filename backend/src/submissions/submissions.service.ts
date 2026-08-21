import { Injectable } from '@nestjs/common';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { SubmissionRow, mapSubmission } from '../common/mappers';
import { CreateSubmissionDto } from './create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(userId: string) {
    const { data, error } = await this.supabase.client
      .from('submissions')
      .select('id, title, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as SubmissionRow[]).map(mapSubmission);
  }

  async create(user: User, dto: CreateSubmissionDto) {
    const { data, error } = await this.supabase.client
      .from('submissions')
      .insert({
        user_id: user.id,
        title: dto.title,
        image_url: dto.imageUrl,
        category: dto.category ?? null,
        themes: dto.themes ?? [],
        age_min: dto.ageMin ?? null,
        age_max: dto.ageMax ?? null,
        format: dto.format ?? null,
        price: dto.price ?? null,
        cost: dto.cost ?? null,
        charity: dto.charity ?? false,
        level: dto.level ?? null,
        event_date: dto.eventDate ?? null,
        event_date_end: dto.eventDateEnd ?? null,
        event_time: dto.eventTime ?? null,
        deadline_date: dto.deadlineDate ?? null,
        address: dto.address ?? null,
        audience: dto.audience ?? null,
        description: dto.description ?? null,
        registration_url: dto.registrationUrl ?? null,
        extra_link_title: dto.extraLinkTitle ?? null,
        extra_link_url: dto.extraLinkUrl ?? null,
        instagram: dto.instagram ?? null,
        telegram: dto.telegram ?? null,
        whatsapp: dto.whatsapp ?? null,
        status: 'pending'
      })
      .select('id, title, status, created_at')
      .single();
    if (error) throw error;
    return mapSubmission(data as SubmissionRow);
  }
}
