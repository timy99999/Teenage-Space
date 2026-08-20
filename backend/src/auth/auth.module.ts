import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { AdminGuard } from './admin.guard';

@Module({
  controllers: [AuthController],
  providers: [SupabaseAuthGuard, AdminGuard],
  exports: [SupabaseAuthGuard, AdminGuard]
})
export class AuthModule {}
