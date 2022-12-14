import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '../../users/model/user.model';
import { ConferenceModel } from '../../conference/model/conference.model';

interface IHistoryCreationAttrs {
  conferenceId: string;
  userId: number;
  enteredTime: Date;
  leaveTime?: Date;
}

@Table({ tableName: 'history' })
export class HistoryModel extends Model<HistoryModel, IHistoryCreationAttrs> {
  @ForeignKey(() => ConferenceModel)
  @PrimaryKey
  @Column
  conferenceId: string;

  @BelongsTo(() => ConferenceModel)
  conference: ConferenceModel;

  @ForeignKey(() => UserModel)
  @PrimaryKey
  @Column
  userId: number;

  @Column({
    type: DataType.DATE,
  })
  enteredTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  leaveTime: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
