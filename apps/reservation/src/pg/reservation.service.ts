import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository
  ){}
  create(createPGReservationDto: CreateReservationDto) {
    // Create create a new entity of object === new Entity(data)
    const reservation = this.reservationRepository.create({
      ...createPGReservationDto,
      timestamp: new Date(),
    })
    return this.reservationRepository.save(reservation)
  }

  findAll() {
    return this.reservationRepository.findAll();
  }

  findOne(id: number) {
    return this.reservationRepository.findOneById(id);
  }

  update( updateReservationDto: UpdateReservationDto, id?: number) {
    // updateReservationDto is extends to createReservationDto
    if(id) return this.reservationRepository.save({...updateReservationDto, id})

    return this.reservationRepository.save(updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.findOneAndDelete(id);
  }
}
