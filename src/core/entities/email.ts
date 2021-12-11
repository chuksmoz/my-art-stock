import { AutoMap } from '@nartc/automapper';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Email {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  from: string;

  @AutoMap()
  @Column()
  to: string;

  @AutoMap()
  @Column()
  subject: string;

  @AutoMap()
  @Column()
  body: string;

  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;
}
