import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoryModel } from './model/history.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [SequelizeModule.forFeature([HistoryModel]), AuthModule],
  exports: [HistoryService],
})
export class HistoryModule {}
