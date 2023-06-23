import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuards } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { Users } from './models/users.entity';

@Controller('pg/user')
export class UsersController {

  constructor(private readonly userService: UsersService){}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    this.userService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuards)
  async getUser(
    @CurrentUser() user: Users
  ){
    return user;
  }
}
