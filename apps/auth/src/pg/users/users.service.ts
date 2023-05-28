import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto){
    const user = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10) // 10: number of character that will be add for additional security 
    })
    return await this.usersRepository.save(user).catch(err=>console.log(err))
  }

  async verifyUser(email: string, password: string){
    // const user = await this.usersRepository.findOne({email})
    const user = await this.usersRepository.findByCondition({where: {email}})
    const passwordIsvalid = await bcrypt.compare(password, user.password)
    if(!passwordIsvalid){
      throw new UnauthorizedException("Credential are not valid")
    }
    return user
  }
}
