import { Module } from '@nestjs/common';
import { AuthController as MGAuthController } from './mg/auth.controller';
import { AuthService as MGAuthService } from './mg/auth.service';

import { AuthController as PGAuthController } from './pg/auth.controller';
import { AuthService as PGAuthService } from './pg/auth.service';

import { UsersModule as MGUsersModule} from './mg/users/users.module';
import { UsersModule as PGUsersModule } from './pg/users/users.module';

import { LoggerModule } from '@app/common/logger';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MGUsersModule,
    PGUsersModule,
    LoggerModule,
    JwtModule.registerAsync({
      useFactory: ((configService: ConfigService) =>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIRATION")}`
        }
      }))
    })
  ],
  controllers: [MGAuthController, PGAuthController],
  providers: [MGAuthService, PGAuthService],
})
export class AuthModule {}
