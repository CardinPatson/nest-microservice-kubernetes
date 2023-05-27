import { PGAbstractData, PGAbstractRepository } from "@app/common/database";
import { Reservation } from "./models/reservation.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationRepositoryInterface } from "./interfaces/reservation.interface";
import { Repository } from "typeorm";
// import { Logger } from "nestjs-pino";
// import { Logger } from "typeorm";

@Injectable()
export class ReservationRepository 
  extends PGAbstractRepository<Reservation>
  implements ReservationRepositoryInterface
  {
    // protected readonly logger = new Logger(ReservationEntity);
    constructor(
      @InjectRepository(Reservation)
      private readonly ReservationRepository: Repository<Reservation>
    ){
      super(ReservationRepository)
    }
  }
