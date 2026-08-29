import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { SuperAdminGuard } from '../auth/super-admin.guard';
import { BarsAdminService } from './bars-admin.service';
import { BarsQueryDto } from './dto/bars-query.dto';

const DEFAULT_DAYS = 14;

/** Admin surface for the Telegram agent "Барс": the QA transcript browser and the
 *  usage/token analytics. Super-admin only, same as capacity and traffic. */
@Controller('admin/bars')
@UseGuards(SupabaseAuthGuard, SuperAdminGuard)
export class BarsAdminController {
  constructor(private readonly bars: BarsAdminService) {}

  @Get('analytics')
  getAnalytics(@Query() query: BarsQueryDto) {
    return this.bars.getAnalytics(query.days ?? DEFAULT_DAYS);
  }

  @Get('chats')
  getChats(@Query() query: BarsQueryDto) {
    return this.bars.getChats(query.days ?? DEFAULT_DAYS);
  }

  @Get('chats/:chatId/messages')
  getMessages(@Param('chatId') chatId: string) {
    return this.bars.getMessages(chatId);
  }
}
