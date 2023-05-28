import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Users } from './users/models/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService){}
  async login(user: Users, response: Response){
    // Donnée qui va partir avec le token
    const tokenPaylaod = {
      userId: user.id
    }

    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds()+this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPaylaod)

    response.cookie("Authentification", token, {
      httpOnly: true, 
      expires
    })
  }
}
