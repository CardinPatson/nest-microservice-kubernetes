import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    //information that stored on the encrypted token
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    //cookie are only available for http request
    //people can deal with cookie on client without sending request
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
