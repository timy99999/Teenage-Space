import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TrafficController } from './traffic.controller';
import { TrafficAdminController } from './traffic-admin.controller';
import { TrafficService } from './traffic.service';
import { TrafficAdminService } from './traffic-admin.service';
import { TrafficCleanupService } from './traffic-cleanup.service';

@Module({
  imports: [AuthModule],
  controllers: [TrafficController, TrafficAdminController],
  providers: [TrafficService, TrafficAdminService, TrafficCleanupService]
})
export class TrafficModule {}
