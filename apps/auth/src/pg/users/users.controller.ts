import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('pg/users')
export class UsersController {

  constructor(private readonly userService: UsersService){}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    this.userService.create(createUserDto)
  }
}