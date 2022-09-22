import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany((type) => Contact, (contact) => contact.user, {
    eager: true,
  })
  contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;
}
