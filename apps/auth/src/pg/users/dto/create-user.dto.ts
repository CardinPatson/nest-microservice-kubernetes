import { IsString, IsEmail, IsStrongPassword, IsNumber } from "class-validator";

export class CreateUserDto{
  @IsString()
  firstname: string;

  @IsNumber()
  age: number;
  
  @IsEmail()
  email: string;
  
  @IsStrongPassword()
  password: string;
}