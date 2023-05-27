import { PGAbstractData } from "@app/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservation')
export class Reservation{  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  // @Column()
  // userId: number;

  // @Column()
  // placeId: number;

  // @Column()
  // invoiceId: number;
}