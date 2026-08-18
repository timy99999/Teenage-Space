import { Controller, Get, Param } from '@nestjs/common';
import { EducationService } from './education.service';

@Controller()
export class EducationController {
  constructor(private readonly education: EducationService) {}

  @Get('education/:track')
  byTrack(@Param('track') track: string) {
    return this.education.byTrack(track);
  }

  @Get('articles/:id')
  article(@Param('id') id: string) {
    return this.education.article(id);
  }
}
