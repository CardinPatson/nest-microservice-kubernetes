import {
  Controller,
  Get,
  UseGuards,
  Post,
  Res,
  Req,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import UserService
@Controller('mg')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(
    // Get access to the user after run the guard
    // @CurrentUser() user: UserDocument,
    @Body() req: any,
    @Res({ passthrough: true }) response: Response, //set the JWT as a cookie on the response object
  ) {
    // console.log(req);
    await 
    // console.log('this is the user', user);
    // await this.authService.login(user, response);
    // response.send(user);
  }
  @Get()
  getHello(): string {
    console.log('HELLO WORD');
    return this.authService.getHello();
  }
}
