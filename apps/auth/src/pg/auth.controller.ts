import { Controller, Get, UseGuards, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { Users } from './users/models/users.entity';
import { Response } from 'express';
@Controller('pg')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: Users,
    @Res({passthrough: true}) response: Response
  ){
    await this.authService.login(user, response)
    response.send(user)
  }
}
