import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  create(createUserDto: CreateUserDto){
    const user = this.usersRepository.create(createUserDto)

    return this.usersRepository.save(user)
  }
}