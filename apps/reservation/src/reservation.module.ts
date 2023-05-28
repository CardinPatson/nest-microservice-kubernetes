import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/database';
import { ReservationService as MGReservationService } from './mg/reservation.service';
import { ReservationController as MGReservationController } from './mg/reservation.controller';
import { ReservationRepository as MGReservationRepository} from './mg/reservation.repository';
import { ReservationService as PGReservationService } from './pg/reservation.service';
import { ReservationController as PGReservationController } from './pg/reservation.controller';
import { ReservationRepository as PGReservationRepository } from './pg/reservation.repository';
import { ReservationDocument, ReservationSchema } from './mg/models/reservation.schema';
import { LoggerModule } from '@app/common/logger';
import { Reservation } from './pg/models/reservation.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { pgDatabase, mgDatabase } from './db/database';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [pgDatabase, mgDatabase],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required().default(5432),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required()
      })
    }),
    DatabaseModule, 
    DatabaseModule.mgForFeature([{name : ReservationDocument.name, schema: ReservationSchema}]),
    DatabaseModule.pgForFeature([Reservation]),
    LoggerModule,
  ],
  controllers: [
    MGReservationController, 
    PGReservationController
  ],
  providers: [
    MGReservationService, 
    MGReservationRepository, 
    PGReservationService, 
    PGReservationRepository
  ]
})
export class ReservationModule {}
