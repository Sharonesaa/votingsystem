import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CandidateModule } from './modules/candidate/candidate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=> configService.get('typeorm')
    }),
  UserModule,
  CandidateModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}