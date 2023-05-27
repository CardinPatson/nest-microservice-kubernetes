import { MGAbstractRepository } from "@app/common/database";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDocument } from "./models/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends MGAbstractRepository<UserDocument>{
  protected readonly logger = new Logger(UsersRepository.name)

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>){
    super(userModel)
  }
}