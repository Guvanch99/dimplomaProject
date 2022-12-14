import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsString, Max, Min } from 'class-validator';
import { UserModel } from '../../users/model/user.model';
import { HistoryModel } from '../../history/model/history.model';

interface IConferenceCreationAttrs {
  conferenceName: string;
  conferenceId: string;
  conferencePassword: string;
  createdBy: number;
}

@Table({ tableName: 'conference' })
export class ConferenceModel extends Model<
  ConferenceModel,
  IConferenceCreationAttrs
> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  @IsString({ message: 'Please provide a conferenceID' })
  conferenceId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'name must be string' })
  @Max(40, { message: 'name must be 40' })
  @Min(4, { message: 'name must be 4' })
  conferenceName: string;

  @Column({ type: DataType.STRING, unique: true })
  @IsString({ message: 'Please provide a string' })
  @Max(12, { message: 'password must be 12' })
  @Min(4, { message: 'password must be 4' })
  conferencePassword: string;

  @Column({ type: DataType.DATE, unique: true, allowNull: true })
  @IsString({ message: 'Please provide a conferenceID' })
  conferenceEndTime: Date;

  @ForeignKey(() => UserModel)
  @Column
  createdBy: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasOne(() => HistoryModel)
  history: HistoryModel;
}
