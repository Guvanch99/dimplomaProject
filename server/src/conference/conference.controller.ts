import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { ConferenceService } from './conference.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createConference(@Body() conferenceDto: CreateConferenceDto) {
    return this.conferenceService.createConference(conferenceDto);
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  joinConference(@Query() query: any) {
    const { conferenceId, conferencePassword } = query;
    return this.conferenceService.joinConference({
      conferenceId,
      conferencePassword,
    });
  }

  @Post('endConference')
  @UseGuards(JwtAuthGuard)
  endConference(@Body() { conferenceId }: { conferenceId: string }) {
    return this.conferenceService.endConference(conferenceId);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  getConferenceHistory() {
    return this.conferenceService.getConferenceHistory();
  }
}
