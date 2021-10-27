import { User } from './users';
import { IsBoolean, IsDate, IsInt, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item';
import { AutoMap } from 'nestjsx-automapper';

@Entity()
export class Order {
  @AutoMap()
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @IsInt()
  @Column()
  userId: number;

  @AutoMap()
  @IsNumber()
  @Column()
  price!: number;

  @AutoMap()
  @IsBoolean()
  @Column()
  completed!: boolean;

  @AutoMap()
  @IsDate()
  @Column()
  createdAt!: Date;

  @IsInt()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];
}
