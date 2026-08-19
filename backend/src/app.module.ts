import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { EducationModule } from './education/education.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RatingsModule } from './ratings/ratings.module';
import { ProfileModule } from './profile/profile.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ ttl: 60000, isGlobal: true }),
    SupabaseModule,
    AuthModule,
    EventsModule,
    NewsModule,
    EducationModule,
    FavoritesModule,
    RatingsModule,
    ProfileModule,
    SubmissionsModule
  ]
})
export class AppModule {}
