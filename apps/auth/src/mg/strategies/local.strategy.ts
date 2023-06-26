import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  //validate method (check if user and email is correct)
  async validate(email: string, password: string) {
    try {
      console.log(email);
      return await this.userService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException('cannot verify the ');
    }
  }
}
