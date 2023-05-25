import { AbsctractRepository } from "@app/common/database";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationDocument } from "../models/reservation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ReservationRepository extends AbsctractRepository<ReservationDocument>{
  protected readonly logger = new Logger(ReservationRepository.name);

  //inject the model from mongoose that is need for the abstract repository 
  constructor(
    @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
  ){
    super(reservationModel)
  }
}