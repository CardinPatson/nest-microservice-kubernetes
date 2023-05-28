import { Injectable, UnauthorizedException } from '@nestjs/common';
  import { UsersRepository } from './users.repository';
  import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

  @Injectable()
  export class UsersService {
    constructor(private readonly usersRepository: UsersRepository){}

    async create(createUserDto: CreateUserDto){
      const user = this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      })
    }

    async verifyUser(email: string, password){
      const user = await this.usersRepository.findOne({email})
      const passwordIsValid = await bcrypt.compare(password, user.password)

      if(!passwordIsValid){
        throw new UnauthorizedException('Credential are not valid')
      }
      return user
    }
  }
