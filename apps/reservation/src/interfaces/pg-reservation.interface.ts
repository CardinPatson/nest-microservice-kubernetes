import { PGAbstractInterface } from "@app/common/database";
import { Reservation } from "../models/reservation.entity";

export interface PGReservationRepositoryInterface 
  extends PGAbstractInterface<Reservation>{

}