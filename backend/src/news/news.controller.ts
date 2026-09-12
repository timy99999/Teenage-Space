import { Controller, Get, Header, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { NewsService } from './news.service';

const CACHE_CONTROL = 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400';

@Controller('news')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class NewsController {
  constructor(private readonly news: NewsService) {}

  @Get()
  @Header('Cache-Control', CACHE_CONTROL)
  list() {
    return this.news.list();
  }

  @Get(':id')
  @Header('Cache-Control', CACHE_CONTROL)
  findOne(@Param('id') id: string) {
    return this.news.findOne(id);
  }
}
