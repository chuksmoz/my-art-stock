import { Contributor } from './contributor';
import { AutoMap } from '@nartc/automapper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users';

@Entity()
export class SubContributor {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  @AutoMap()
  lastName: string;

  @Column({ length: 50 })
  @AutoMap()
  email: string;

  @AutoMap()
  @Column({ nullable: true })
  phoneNumber: string;

  @AutoMap()
  @Column({ nullable: true })
  profileImageUrl: string;

  @AutoMap()
  @Column({ nullable: true })
  countryId: number;

  @AutoMap()
  @Column({ nullable: true })
  stateId: number;

  @AutoMap()
  @Column({ nullable: true })
  city: string;

  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  modifiedDate: Date;

  @AutoMap()
  @Column()
  isDeleted: boolean;

  @AutoMap()
  @Column()
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.contributors)
  user: User;

  @ManyToOne(() => Contributor, (contributor) => contributor.subContributors)
  contributor: Contributor;
}
