import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CurrentUser } from '../auth/supabase-user.decorator';
import type { User } from '@supabase/supabase-js';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './create-submission.dto';

@Controller('submissions')
@UseGuards(SupabaseAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissions: SubmissionsService) {}

  @Get()
  list(@CurrentUser() user: User) {
    return this.submissions.list(user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateSubmissionDto) {
    return this.submissions.create(user, dto);
  }
}
