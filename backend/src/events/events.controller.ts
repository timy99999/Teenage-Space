import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { QueryEventsDto } from './query-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Get()
  list(@Query() query: QueryEventsDto) {
    return this.events.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.events.findOne(id);
  }
}
