import { Controller, Get, Header, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { EventsService } from './events.service';
import { QueryEventsDto } from './query-events.dto';

const CACHE_CONTROL = 'public, max-age=60, stale-while-revalidate=300';

@Controller('events')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Get()
  @Header('Cache-Control', CACHE_CONTROL)
  list(@Query() query: QueryEventsDto) {
    return this.events.list(query);
  }

  @Get(':id')
  @Header('Cache-Control', CACHE_CONTROL)
  findOne(@Param('id') id: string) {
    return this.events.findOne(id);
  }
}
