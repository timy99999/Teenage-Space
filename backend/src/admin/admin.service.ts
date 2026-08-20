import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { SupabaseService } from '../supabase/supabase.service';
import {
  EventRow,
  mapEvent,
  mapNews,
  mapProfile,
  mapSubmissionAdmin,
  NewsRow,
  ProfileRow,
  SubmissionAdminRow
} from '../common/mappers';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly supabase: SupabaseService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  async listSubmissions(status?: string) {
    let query = this.supabase.client.from('submissions').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return (data as SubmissionAdminRow[]).map(mapSubmissionAdmin);
  }

  async updateSubmission(id: string, dto: UpdateSubmissionDto) {
    const patch: Record<string, unknown> = {};
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.categories !== undefined) patch.categories = dto.categories;
    if (dto.themes !== undefined) patch.themes = dto.themes;
    if (dto.ages !== undefined) patch.ages = dto.ages;
    if (dto.format !== undefined) patch.format = dto.format;
    if (dto.price !== undefined) patch.price = dto.price;
    if (dto.cost !== undefined) patch.cost = dto.cost;
    if (dto.charity !== undefined) patch.charity = dto.charity;
    if (dto.level !== undefined) patch.level = dto.level;
    if (dto.eventDate !== undefined) patch.event_date = dto.eventDate;
    if (dto.deadlineDate !== undefined) patch.deadline_date = dto.deadlineDate;
    if (dto.address !== undefined) patch.address = dto.address;
    if (dto.audience !== undefined) patch.audience = dto.audience;
    if (dto.description !== undefined) patch.description = dto.description;
    if (dto.registrationUrl !== undefined) patch.registration_url = dto.registrationUrl;
    if (dto.extraLinkTitle !== undefined) patch.extra_link_title = dto.extraLinkTitle;
    if (dto.extraLinkUrl !== undefined) patch.extra_link_url = dto.extraLinkUrl;
    if (dto.instagram !== undefined) patch.instagram = dto.instagram;
    if (dto.telegram !== undefined) patch.telegram = dto.telegram;
    if (dto.whatsapp !== undefined) patch.whatsapp = dto.whatsapp;

    const { data, error } = await this.supabase.client
      .from('submissions')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return mapSubmissionAdmin(data as SubmissionAdminRow);
  }

  async publishSubmission(id: string, dto: CreateEventDto) {
    const { data: submission, error: subError } = await this.supabase.client
      .from('submissions')
      .select('id')
      .eq('id', id)
      .maybeSingle();
    if (subError) throw subError;
    if (!submission) throw new NotFoundException('Заявка не найдена');

    const event = await this.insertEvent(dto);

    const { error: updateError } = await this.supabase.client
      .from('submissions')
      .update({ status: 'approved', published_event_id: event.id })
      .eq('id', id);
    if (updateError) throw updateError;

    return event;
  }

  async createEvent(dto: CreateEventDto) {
    return this.insertEvent(dto);
  }

  private async insertEvent(dto: CreateEventDto) {
    const { data: event, error: eventError } = await this.supabase.client
      .from('events')
      .insert({
        id: randomUUID(),
        title: dto.title,
        category: dto.category,
        themes: dto.themes ?? [],
        age_min: dto.ageMin,
        age_max: dto.ageMax,
        age_label: dto.ageLabel,
        price: dto.price,
        cost: dto.cost ?? null,
        level: dto.level,
        format: dto.format,
        event_date: dto.eventDate,
        deadline_date: dto.deadlineDate ?? null,
        place: dto.place,
        short_desc: dto.shortDesc,
        description: dto.description,
        instagram: dto.instagram ?? false,
        registration_url: dto.registrationUrl ?? null,
        is_past: false,
        image_url: dto.imageUrl ?? null
      })
      .select('*')
      .single();
    if (eventError) throw eventError;
    await this.cache.clear();
    return mapEvent(event as EventRow);
  }

  async deleteEvent(id: string) {
    await this.supabase.client.from('submissions').update({ published_event_id: null }).eq('published_event_id', id);
    const { error } = await this.supabase.client.from('events').delete().eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async createNews(dto: CreateNewsDto) {
    const { data, error } = await this.supabase.client
      .from('news')
      .insert({
        id: randomUUID(),
        title: dto.title,
        event_date: dto.eventDate,
        short_desc: dto.shortDesc,
        image_url: dto.imageUrl ?? null
      })
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapNews(data as NewsRow);
  }

  async deleteNews(id: string) {
    const { error } = await this.supabase.client.from('news').delete().eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async rejectSubmission(id: string) {
    const { data, error } = await this.supabase.client
      .from('submissions')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return mapSubmissionAdmin(data as SubmissionAdminRow);
  }

  async listUsers() {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as ProfileRow[]).map(mapProfile);
  }

  async setBanned(id: string, banned: boolean) {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .update({ is_banned: banned })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return mapProfile(data as ProfileRow);
  }

  async analytics() {
    const usersTotal = await this.count('profiles');
    const bannedTotal = await this.count('profiles', { is_banned: true });
    const eventsUpcoming = await this.count('events', { is_past: false });
    const eventsPast = await this.count('events', { is_past: true });
    const favoritesTotal = await this.count('favorites');
    const submissionsPending = await this.count('submissions', { status: 'pending' });
    const submissionsApproved = await this.count('submissions', { status: 'approved' });
    const submissionsRejected = await this.count('submissions', { status: 'rejected' });

    const { data: ratingRows, error: ratingsError } = await this.supabase.client.from('ratings').select('value');
    if (ratingsError) throw ratingsError;
    const ratingValues = ((ratingRows ?? []) as { value: number }[]).map((r) => r.value);
    const ratingsAvg = ratingValues.length ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length : null;

    return {
      usersTotal,
      bannedTotal,
      eventsTotal: eventsUpcoming + eventsPast,
      eventsUpcoming,
      eventsPast,
      favoritesTotal,
      ratingsTotal: ratingValues.length,
      ratingsAvg,
      submissions: { pending: submissionsPending, approved: submissionsApproved, rejected: submissionsRejected }
    };
  }

  private async count(table: string, match?: Record<string, unknown>) {
    let query = this.supabase.client.from(table).select('*', { count: 'exact', head: true });
    if (match) query = query.match(match);
    const { count, error } = await query;
    if (error) throw error;
    return count ?? 0;
  }
}
