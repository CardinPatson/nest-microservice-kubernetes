import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PGReservationService } from './pg-reservation.service';
import { CreatePGReservationDto } from '../dto/create-pg-reservation.dto';
import { UpdatePGReservationDto } from '../dto/update-pg-reservation.dto';

@Controller('pg/reservation')
export class PGReservationController {
  constructor(private readonly reservationService: PGReservationService) {}

  @Post()
  create(@Body() createPGReservationDto: CreatePGReservationDto) {
    return this.reservationService.create(createPGReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdatePGReservationDto) {
    return this.reservationService.update(updateReservationDto, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
