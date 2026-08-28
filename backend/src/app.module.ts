import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { EducationModule } from './education/education.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RatingsModule } from './ratings/ratings.module';
import { ProfileModule } from './profile/profile.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AdminModule } from './admin/admin.module';
import { CapacityModule } from './capacity/capacity.module';
import { TrafficModule } from './traffic/traffic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({ ttl: 60000, isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    SupabaseModule,
    AuthModule,
    EventsModule,
    NewsModule,
    EducationModule,
    FavoritesModule,
    RatingsModule,
    ProfileModule,
    SubmissionsModule,
    AdminModule,
    CapacityModule,
    TrafficModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
