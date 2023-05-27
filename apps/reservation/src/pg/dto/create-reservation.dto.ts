import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReservationDto {
  @IsDate()
  @Type(()=>Date)
  startDate: Date;

  @IsDate()
  @Type(()=>Date)
  endDate: Date; 

  @IsString()
  testMigration: String;

  // @IsNumber()
  // @IsNotEmpty()
  // placeId : number;

  // @IsNumber()
  // @IsNotEmpty()
  // invoiceId: number;
}