import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConferenceModel } from './model/conference.model';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectModel(ConferenceModel)
    private conferenceRepo: typeof ConferenceModel,
    @Inject(REQUEST) private request: Request,
  ) {}
  async createConference(dto: CreateConferenceDto) {
    const userId = (this.request as any).user.id;
    return await this.conferenceRepo.create({
      ...dto,
      createdBy: userId,
    });
  }
}
