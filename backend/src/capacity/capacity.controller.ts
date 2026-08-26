import { Controller, Get, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';
import { CapacityService } from './capacity.service';

@Controller('admin/capacity')
@UseGuards(SupabaseAuthGuard, SuperAdminGuard)
export class CapacityController {
  constructor(private readonly capacity: CapacityService) {}

  @Get()
  get() {
    return this.capacity.get();
  }
}
