import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BarsAdminController } from './bars-admin.controller';
import { BarsAdminService } from './bars-admin.service';

@Module({
  imports: [AuthModule],
  controllers: [BarsAdminController],
  providers: [BarsAdminService]
})
export class BarsModule {}
