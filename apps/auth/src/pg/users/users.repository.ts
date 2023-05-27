import { PGAbstractRepository } from "@app/common/database";
import { Injectable } from "@nestjs/common";
import { Users } from "./models/users.entity";
import { UsersRepositoryInterface } from "./interfaces/users-interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository extends PGAbstractRepository<Users> implements UsersRepositoryInterface{
  constructor(
    @InjectRepository(Users) private readonly UsersRepository: Repository<Users>
  ){
    super(UsersRepository)
  }
}