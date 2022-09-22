import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @ManyToOne((type) => User, (user) => user.contacts, {
    onDelete: "CASCADE",
  })
  user: string;
}
