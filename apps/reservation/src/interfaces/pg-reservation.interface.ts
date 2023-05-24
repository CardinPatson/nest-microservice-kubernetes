import { PGAbstractInterface } from "@app/common";
import { Reservation } from "../models/reservation.entity";

export interface PGReservationRepositoryInterface 
  extends PGAbstractInterface<Reservation>{

}