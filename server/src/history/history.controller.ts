import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addLeaveTime(@Body() { conferenceId }: { conferenceId: string }) {
    return this.historyService.addLeaveTime(conferenceId);
  }
}
