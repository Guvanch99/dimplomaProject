import { Module } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { ConferenceController } from './conference.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConferenceModel } from './model/conference.model';
import { HistoryModule } from '../history/history.module';

@Module({
  providers: [ConferenceService],
  controllers: [ConferenceController],
  imports: [
    SequelizeModule.forFeature([ConferenceModel]),
    AuthModule,
    HistoryModule,
  ],
})
export class ConferenceModule {}
