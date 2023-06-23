import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/users.schema';
import { JwtAuthGuards } from '../guards/jwt-auth.guard';

@Controller('mg/users')
export class UsersController {

  constructor(private readonly userService: UsersService){}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    this.userService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuards)
  async getUser(
    @CurrentUser() user: UserDocument
  ){
    return user;
  }
}
