import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePGReservationDto {
  @IsDate()
  @Type(()=>Date)
  startdate: Date;

  @IsDate()
  @Type(()=>Date)
  enddate: Date; 

  // @IsNumber()
  // @IsNotEmpty()
  // placeId : number;

  // @IsNumber()
  // @IsNotEmpty()
  // invoiceId: number;
}