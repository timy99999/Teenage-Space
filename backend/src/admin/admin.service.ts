import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { SupabaseService } from '../supabase/supabase.service';
import {
  EducationTrackRow,
  EventRow,
  mapEducationTrack,
  mapEvent,
  mapMaterial,
  mapNews,
  mapProfile,
  mapSubmissionAdmin,
  MaterialRow,
  NewsRow,
  ProfileRow,
  SubmissionAdminRow
} from '../common/mappers';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateEducationTrackDto } from './dto/create-education-track.dto';
import { UpdateEducationTrackDto } from './dto/update-education-track.dto';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

function deriveAgeLabel(min: number, max: number): string {
  if (min <= 0 && max >= 99) return 'Любой';
  if (min === max) return `${min}`;
  if (max >= 99) return `${min}+`;
  return `${min}–${max}`;
}

function deriveShortDesc(description: string): string {
  const trimmed = description.trim();
  if (trimmed.length <= 140) return trimmed;
  return `${trimmed.slice(0, 139).trimEnd()}…`;
}

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
    if (dto.imageUrl !== undefined) patch.image_url = dto.imageUrl;
    if (dto.category !== undefined) patch.category = dto.category;
    if (dto.themes !== undefined) patch.themes = dto.themes;
    if (dto.ageMin !== undefined) patch.age_min = dto.ageMin;
    if (dto.ageMax !== undefined) patch.age_max = dto.ageMax;
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
        age_label: deriveAgeLabel(dto.ageMin, dto.ageMax),
        price: dto.price,
        cost: dto.cost || null,
        level: dto.level,
        format: dto.format,
        event_date: dto.eventDate || null,
        deadline_date: dto.deadlineDate || null,
        place: dto.address ?? '',
        short_desc: deriveShortDesc(dto.description),
        description: dto.description,
        instagram: Boolean(dto.instagram),
        registration_url: dto.registrationUrl || null,
        telegram: dto.telegram || null,
        is_past: false,
        image_url: dto.imageUrl
      })
      .select('*')
      .single();
    if (eventError) throw eventError;
    await this.cache.clear();
    return mapEvent(event as EventRow);
  }

  async updateEvent(id: string, dto: UpdateEventDto) {
    const patch: Record<string, unknown> = {};
    if (dto.imageUrl !== undefined) patch.image_url = dto.imageUrl;
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.category !== undefined) patch.category = dto.category;
    if (dto.themes !== undefined) patch.themes = dto.themes;
    if (dto.ageMin !== undefined) patch.age_min = dto.ageMin;
    if (dto.ageMax !== undefined) patch.age_max = dto.ageMax;
    if (dto.format !== undefined) patch.format = dto.format;
    if (dto.price !== undefined) patch.price = dto.price;
    if (dto.cost !== undefined) patch.cost = dto.cost || null;
    if (dto.level !== undefined) patch.level = dto.level;
    if (dto.eventDate !== undefined) patch.event_date = dto.eventDate || null;
    if (dto.deadlineDate !== undefined) patch.deadline_date = dto.deadlineDate || null;
    if (dto.address !== undefined) patch.place = dto.address ?? '';
    if (dto.description !== undefined) patch.description = dto.description;
    if (dto.registrationUrl !== undefined) patch.registration_url = dto.registrationUrl || null;
    if (dto.instagram !== undefined) patch.instagram = Boolean(dto.instagram);
    if (dto.telegram !== undefined) patch.telegram = dto.telegram || null;

    if (dto.ageMin !== undefined || dto.ageMax !== undefined) {
      const { data: current, error: currentError } = await this.supabase.client
        .from('events')
        .select('age_min, age_max')
        .eq('id', id)
        .single();
      if (currentError) throw currentError;
      const ageMin = dto.ageMin ?? (current as { age_min: number }).age_min;
      const ageMax = dto.ageMax ?? (current as { age_max: number }).age_max;
      patch.age_label = deriveAgeLabel(ageMin, ageMax);
    }
    if (dto.description !== undefined) patch.short_desc = deriveShortDesc(dto.description);

    const { data, error } = await this.supabase.client.from('events').update(patch).eq('id', id).select('*').single();
    if (error) throw error;
    await this.cache.clear();
    return mapEvent(data as EventRow);
  }

  async listArchivedEvents() {
    const { data, error } = await this.supabase.client.from('events').select('*').eq('archived', true).order('title');
    if (error) throw error;
    return (data as EventRow[]).map(mapEvent);
  }

  async archiveEvent(id: string) {
    const { error } = await this.supabase.client.from('events').update({ archived: true }).eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async unarchiveEvent(id: string) {
    const { error } = await this.supabase.client.from('events').update({ archived: false }).eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async moveEventToVoting(id: string) {
    const { error } = await this.supabase.client.from('events').update({ is_past: true, archived: false }).eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async deleteEvent(id: string) {
    await this.supabase.client.from('submissions').update({ published_event_id: null }).eq('published_event_id', id);
    const { error } = await this.supabase.client.from('events').delete().eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async createEducationTrack(dto: CreateEducationTrackDto) {
    const { data, error } = await this.supabase.client
      .from('education_tracks')
      .insert({ id: randomUUID(), title: dto.title, intro: dto.intro ?? '' })
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapEducationTrack(data as EducationTrackRow);
  }

  async updateEducationTrack(id: string, dto: UpdateEducationTrackDto) {
    const patch: Record<string, unknown> = {};
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.intro !== undefined) patch.intro = dto.intro;

    const { data, error } = await this.supabase.client
      .from('education_tracks')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapEducationTrack(data as EducationTrackRow);
  }

  async deleteEducationTrack(id: string) {
    await this.supabase.client.from('materials').delete().eq('track', id);
    const { error } = await this.supabase.client.from('education_tracks').delete().eq('id', id);
    if (error) throw error;
    await this.cache.clear();
  }

  async createMaterial(dto: CreateMaterialDto) {
    const { data, error } = await this.supabase.client
      .from('materials')
      .insert({
        id: randomUUID(),
        track: dto.track,
        title: dto.title,
        meta: dto.meta,
        body: dto.body,
        sort_order: dto.sortOrder ?? 0
      })
      .select('*')
      .single();
    if (error) throw error;
    await this.cache.clear();
    return mapMaterial(data as MaterialRow);
  }

  async updateMaterial(id: string, dto: UpdateMaterialDto) {
    const patch: Record<string, unknown> = {};
    if (dto.track !== undefined) patch.track = dto.track;
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.meta !== undefined) patch.meta = dto.meta;
    if (dto.body !== undefined) patch.body = dto.body;
    if (dto.sortOrder !== undefined) patch.sort_order = dto.sortOrder;

    const { data, error } = await this.supabase.client.from('materials').update(patch).eq('id', id).select('*').single();
    if (error) throw error;
    await this.cache.clear();
    return mapMaterial(data as MaterialRow);
  }

  async deleteMaterial(id: string) {
    const { error } = await this.supabase.client.from('materials').delete().eq('id', id);
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
