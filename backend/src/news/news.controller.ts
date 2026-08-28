import { Controller, Get, Header, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { NewsService } from './news.service';

@Controller('news')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class NewsController {
  constructor(private readonly news: NewsService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400')
  list() {
    return this.news.list();
  }
}
