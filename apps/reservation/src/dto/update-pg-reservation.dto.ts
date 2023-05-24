import { PartialType } from '@nestjs/mapped-types';
import { CreatePGReservationDto } from './create-pg-reservation.dto';

export class UpdatePGReservationDto extends PartialType(CreatePGReservationDto) {}
