import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { AdminGuard } from './admin.guard';
import { SuperAdminGuard } from './super-admin.guard';
import { PermissionGuard } from './permission.guard';
import { BanStatusGuard } from './ban-status.guard';

@Module({
  controllers: [AuthController],
  providers: [SupabaseAuthGuard, AdminGuard, SuperAdminGuard, PermissionGuard, BanStatusGuard],
  exports: [SupabaseAuthGuard, AdminGuard, SuperAdminGuard, PermissionGuard, BanStatusGuard]
})
export class AuthModule {}
