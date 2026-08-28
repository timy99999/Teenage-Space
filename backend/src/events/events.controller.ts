import { Controller, Get, Header, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { EventsService } from './events.service';
import { QueryEventsDto } from './query-events.dto';

// s-maxage lets any shared cache / CDN in front of the API hold it too; the long
// stale-while-revalidate means a client or proxy keeps serving the last good copy
// for up to a day while the backend is briefly unreachable.
const CACHE_CONTROL = 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400';

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
