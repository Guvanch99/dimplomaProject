import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsEmail, IsString, Max, Min } from 'class-validator';
import { ConferenceModel } from '../../conference/model/conference.model';
import { HistoryModel } from '../../history/model/history.model';

interface IUserCreationAttrs {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'user' })
export class UserModel extends Model<UserModel, IUserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsString({ message: 'name must be string' })
  @Max(40, { message: 'name must be 40' })
  @Min(4, { message: 'name must be 4' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @IsEmail({}, { message: 'Please provide a correct email' })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @IsString({ message: 'Please provide a string' })
  @Max(12, { message: 'password must be 12' })
  @Min(4, { message: 'password must be 4' })
  password: boolean;

  @HasMany(() => ConferenceModel)
  conferences: ConferenceModel[];

  @BelongsToMany(() => ConferenceModel, () => HistoryModel)
  conferenceId: ConferenceModel[];
}
