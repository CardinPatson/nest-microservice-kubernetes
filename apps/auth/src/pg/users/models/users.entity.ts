import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users{
  @PrimaryColumn()
  id: number; 

  @Column()
  email: string;

  @Column()
  password: string;
}