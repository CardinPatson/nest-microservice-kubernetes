import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users{
  @PrimaryColumn()
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