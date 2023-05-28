import { Controller, Get, UseGuards, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

@Controller('mg')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
        // Get access to the user after run the guard
        @CurrentUser() user: UserDocument,
        @Res({passthrough: true}) response: Response//set the JWT as a cookie on the response object 
  ){
    await this.authService.login(user, response)
    response.send(user)
  }
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}