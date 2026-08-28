import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersAdminController } from './users-admin.controller';
import { UsersAdminService } from './users-admin.service';

@Module({
  imports: [AuthModule],
  controllers: [AdminController, UsersAdminController],
  providers: [AdminService, UsersAdminService]
})
export class AdminModule {}
