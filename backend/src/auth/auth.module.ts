import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { AdminGuard } from './admin.guard';
import { SuperAdminGuard } from './super-admin.guard';

@Module({
  controllers: [AuthController],
  providers: [SupabaseAuthGuard, AdminGuard, SuperAdminGuard],
  exports: [SupabaseAuthGuard, AdminGuard, SuperAdminGuard]
})
export class AuthModule {}
