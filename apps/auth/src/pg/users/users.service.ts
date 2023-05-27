import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto){
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user).catch(err=>console.log(err))
  }
}
