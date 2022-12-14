import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HistoryModel } from './model/history.model';
import { HistoryCreateDto } from './dto/historyCreate.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(HistoryModel)
    private historyRepo: typeof HistoryModel,
    @Inject(REQUEST) private request: Request,
  ) {}

  async addHistory(dto: HistoryCreateDto) {
    return await this.historyRepo.create(dto);
  }
  async addLeaveTime(conferenceId: string) {
    const userId = (this.request as any).user.id;
    await this.historyRepo.update(
      { leaveTime: new Date() },
      {
        where: {
          conferenceId,
          userId,
        },
      },
    );

    return 'success';
  }
}
