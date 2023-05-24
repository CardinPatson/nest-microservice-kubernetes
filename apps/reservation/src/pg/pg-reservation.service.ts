import { Injectable } from '@nestjs/common';
import { CreatePGReservationDto } from '../dto/create-pg-reservation.dto';
import { UpdatePGReservationDto } from '../dto/update-pg-reservation.dto';
import { PGReservationRepository } from './pg-reservation.repository';

@Injectable()
export class PGReservationService {
  constructor(
    private readonly reservationRepository: PGReservationRepository
  ){}
  create(createPGReservationDto: CreatePGReservationDto) {
    console.log(createPGReservationDto)
    return this.reservationRepository.create({
      ...createPGReservationDto,
      timestamp: new Date(),
      // userId: 1
    })
  }

  findAll() {
    return this.reservationRepository.findAll();
  }

  findOne(id: number) {
    return this.reservationRepository.findOneById(id);
  }

  update( updateReservationDto: UpdatePGReservationDto, id?: number) {
    // updateReservationDto is extends to createReservationDto
    if(id) return this.reservationRepository.save({...updateReservationDto, id})

    return this.reservationRepository.save(updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.findOneAndDelete(id);
  }
}
