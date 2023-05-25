import { PGAbstractData, PGAbstractRepository } from "@app/common";
import { Reservation } from "../models/reservation.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PGReservationRepositoryInterface } from "../interfaces/pg-reservation.interface";
import { Repository } from "typeorm";
// import { Logger } from "nestjs-pino";
// import { Logger } from "typeorm";

@Injectable()
export class PGReservationRepository 
  extends PGAbstractRepository<Reservation>
  implements PGReservationRepositoryInterface
  {
    // protected readonly logger = new Logger(ReservationEntity);
    constructor(
      @InjectRepository(Reservation)
      private readonly ReservationRepository: Repository<Reservation>
    ){
      super(ReservationRepository)
    }
  }
