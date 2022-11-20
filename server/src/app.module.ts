import { CacheModule, Module } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { UserModel } from './users/model/user.model';
import { ConferenceModule } from './conference/conference.module';
import { ConferenceModel } from './conference/model/conference.model';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: process.env.PG_PORT as unknown as number,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD as unknown as string,
      database: process.env.PG_DATABASE,
      models: [UserModel, ConferenceModel],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ConferenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
