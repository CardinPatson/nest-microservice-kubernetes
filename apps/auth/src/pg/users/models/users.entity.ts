import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users{
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  firstname: string;

  @Column()
  age: number;
  
  @Column()
  email: string;

  @Column()
  password: string;
}