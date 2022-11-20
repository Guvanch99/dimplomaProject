import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { ConferenceService } from './conference.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conference')
export class ConferenceController {
  constructor(private conferenceService: ConferenceService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  createConference(@Body() conferenceDto: CreateConferenceDto) {
    return this.conferenceService.createConference(conferenceDto);
  }
}
