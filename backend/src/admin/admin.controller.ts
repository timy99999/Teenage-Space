import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AdminService } from './admin.service';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { CreateEducationTrackDto } from './dto/create-education-track.dto';
import { UpdateEducationTrackDto } from './dto/update-education-track.dto';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('admin')
@UseGuards(SupabaseAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('submissions')
  listSubmissions(@Query('status') status?: string) {
    return this.admin.listSubmissions(status);
  }

  @Patch('submissions/:id')
  updateSubmission(@Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    return this.admin.updateSubmission(id, dto);
  }

  @Post('submissions/:id/publish')
  publishSubmission(@Param('id') id: string, @Body() dto: CreateEventDto) {
    return this.admin.publishSubmission(id, dto);
  }

  @Post('submissions/:id/reject')
  rejectSubmission(@Param('id') id: string) {
    return this.admin.rejectSubmission(id);
  }

  @Post('events')
  createEvent(@Body() dto: CreateEventDto) {
    return this.admin.createEvent(dto);
  }

  @Get('events/archived')
  listArchivedEvents() {
    return this.admin.listArchivedEvents();
  }

  @Patch('events/:id')
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.admin.updateEvent(id, dto);
  }

  @Post('events/:id/archive')
  @HttpCode(204)
  archiveEvent(@Param('id') id: string) {
    return this.admin.archiveEvent(id);
  }

  @Post('events/:id/unarchive')
  @HttpCode(204)
  unarchiveEvent(@Param('id') id: string) {
    return this.admin.unarchiveEvent(id);
  }

  @Post('events/:id/move-to-voting')
  @HttpCode(204)
  moveEventToVoting(@Param('id') id: string) {
    return this.admin.moveEventToVoting(id);
  }

  @Delete('events/:id')
  @HttpCode(204)
  deleteEvent(@Param('id') id: string) {
    return this.admin.deleteEvent(id);
  }

  @Post('news')
  createNews(@Body() dto: CreateNewsDto) {
    return this.admin.createNews(dto);
  }

  @Delete('news/:id')
  @HttpCode(204)
  deleteNews(@Param('id') id: string) {
    return this.admin.deleteNews(id);
  }

  @Post('education-tracks')
  createEducationTrack(@Body() dto: CreateEducationTrackDto) {
    return this.admin.createEducationTrack(dto);
  }

  @Patch('education-tracks/:id')
  updateEducationTrack(@Param('id') id: string, @Body() dto: UpdateEducationTrackDto) {
    return this.admin.updateEducationTrack(id, dto);
  }

  @Delete('education-tracks/:id')
  @HttpCode(204)
  deleteEducationTrack(@Param('id') id: string) {
    return this.admin.deleteEducationTrack(id);
  }

  @Post('materials')
  createMaterial(@Body() dto: CreateMaterialDto) {
    return this.admin.createMaterial(dto);
  }

  @Patch('materials/:id')
  updateMaterial(@Param('id') id: string, @Body() dto: UpdateMaterialDto) {
    return this.admin.updateMaterial(id, dto);
  }

  @Delete('materials/:id')
  @HttpCode(204)
  deleteMaterial(@Param('id') id: string) {
    return this.admin.deleteMaterial(id);
  }

  @Get('analytics')
  analytics() {
    return this.admin.analytics();
  }
}
