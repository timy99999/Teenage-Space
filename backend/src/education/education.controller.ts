import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { EducationService } from './education.service';

const CACHE_CONTROL = 'public, max-age=60, stale-while-revalidate=300';

@Controller()
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class EducationController {
  constructor(private readonly education: EducationService) {}

  @Get('education/tracks')
  @Header('Cache-Control', CACHE_CONTROL)
  listTracks() {
    return this.education.listTracks();
  }

  @Get('education/:track')
  @Header('Cache-Control', CACHE_CONTROL)
  byTrack(@Param('track') track: string) {
    return this.education.byTrack(track);
  }

  @Get('articles/:id')
  @Header('Cache-Control', CACHE_CONTROL)
  article(@Param('id') id: string) {
    return this.education.article(id);
  }
}
