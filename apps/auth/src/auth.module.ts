import { Module } from '@nestjs/common';
import { AuthController as MGAuthController } from './mg/auth.controller';
import { AuthService as MGAuthService } from './mg/auth.service';

import { AuthController as PGAuthController } from './pg/auth.controller';
import { AuthService as PGAuthService } from './pg/auth.service';

import { UsersModule as MGUsersModule } from './mg/users/users.module';
import { UsersModule as PGUsersModule } from './pg/users/users.module';

import { LoggerModule } from '@app/common/logger';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { pgDatabase, mgDatabase } from './db/database';
import { LocalStrategy as MGLocalStrategy } from './mg/strategies/local.strategy';
import { LocalStrategy as PGLocalStrategy } from './pg/strategies/local.strategy';

import { JwtStrategy as MGJwtStrategy } from './mg/strategies/jwt.strategy';
import { JwtStrategy as PGJwtStrategy } from './pg/strategies/jwt.strategy';
@Module({
  imports: [
    MGUsersModule,
    PGUsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pgDatabase, mgDatabase],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required().default(5432),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MGAuthController, PGAuthController],
  providers: [
    MGAuthService,
    PGAuthService,
    MGLocalStrategy,
    PGLocalStrategy,
    MGJwtStrategy,
    PGJwtStrategy,
  ],
})
export class AuthModule {}
