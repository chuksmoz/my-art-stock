import { User } from 'src/core/entities/users';
import { SubContributor } from './sub-contributor';
import { AutoMap } from '@nartc/automapper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';

@Entity()
export class Contributor {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  userId: number;

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

  /* @OneToOne(() => User, (user) => user.contributor)
  user: User; */

  @OneToMany(
    () => SubContributor,
    (subContributor) => subContributor.contributor,
  )
  subContributors: SubContributor[];
  /*
  @OneToMany(() => Product, (product) => product.contributor)
  products: Product[]; */
}
