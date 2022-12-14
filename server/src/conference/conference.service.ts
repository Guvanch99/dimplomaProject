import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConferenceModel } from './model/conference.model';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { REQUEST } from '@nestjs/core';
import { JoinConferenceDto } from './dto/join-conference.dto';
import * as bcryptjs from 'bcryptjs';
import { HistoryService } from '../history/history.service';

import { Op } from 'sequelize';
import { HistoryModel } from '../history/model/history.model';
import { UserModel } from '../users/model/user.model';

@Injectable()
export class ConferenceService {
  constructor(
    private historyService: HistoryService,
    @InjectModel(ConferenceModel)
    private conferenceRepo: typeof ConferenceModel,
    @Inject(REQUEST) private request: Request,
  ) {}
  async createConference(dto: CreateConferenceDto) {
    const userId = (this.request as any).user.id;
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(dto.conferencePassword, salt);
    return await this.conferenceRepo.create({
      ...dto,
      conferencePassword: hashPassword,
      createdBy: userId,
    });
  }

  async joinConference(dto: JoinConferenceDto) {
    const joinerId = (this.request as any).user.id;
    const conference = await this.conferenceRepo.findOne({
      where: {
        conferenceId: dto.conferenceId,
      },
    });

    if (!conference) {
      throw new HttpException(
        'there is no conference with this id',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (conference.conferenceEndTime) {
      throw new HttpException('conference is finised', HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcryptjs.compare(
      dto.conferencePassword,
      conference.conferencePassword,
    );
    if (!passwordEquals) {
      throw new HttpException('there is no conference', HttpStatus.BAD_REQUEST);
    }

    if (conference.conferenceEndTime) {
      throw new HttpException(
        'conference already ended',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.historyService.addHistory({
      userId: joinerId,
      conferenceId: dto.conferenceId,
      enteredTime: new Date(),
    });
    return 'success';
  }

  async endConference(conferenceId: string) {
    const conference = await this.conferenceRepo.findOne({
      where: {
        conferenceId: conferenceId,
      },
    });
    conference.conferenceEndTime = new Date();
    await conference.save();
    return 'success';
  }

  async getConferenceHistory() {
    const userId = (this.request as any).user.id;
    const result = await this.conferenceRepo.findAll({
      where: { createdBy: userId, conferenceEndTime: { [Op.ne]: null } },
      attributes: [
        'conferenceName',
        'conferenceId',
        'conferenceEndTime',
        'createdAt',
      ],
      include: [
        {
          model: HistoryModel,
          attributes: ['enteredTime', 'leaveTime', 'conferenceId'],
          include: [
            {
              model: UserModel,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    return result;
  }
}
