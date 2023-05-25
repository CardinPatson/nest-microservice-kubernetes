import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/database';
import { ReservationService } from './mg/reservation.service';
import { ReservationController } from './mg/reservation.controller';
import { ReservationRepository } from './mg/reservation.repository';
import { PGReservationService } from './pg/pg-reservation.service';
import { PGReservationController } from './pg/pg-reservation.controller';
import { PGReservationRepository } from './pg/pg-reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
// import { LoggerModule, PGDatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common';
import { Reservation } from './models/reservation.entity';

@Module({
  imports: [
    // PGDatabaseModule.forFeature([Reservation]),
    DatabaseModule, 
    // PGDatabaseModule,
    DatabaseModule.mgForFeature([{name : ReservationDocument.name, schema: ReservationSchema}]),
    DatabaseModule.pgForFeature([Reservation]),
    LoggerModule,
  ],
  controllers: [
    ReservationController, 
    PGReservationController
  ],
  providers: [
    ReservationService, 
    ReservationRepository, 
    PGReservationService, 
    PGReservationRepository
  ]
})
export class ReservationModule {}
