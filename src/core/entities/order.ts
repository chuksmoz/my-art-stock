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

@Entity()
export class Order {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @Column()
  userId: string;

  @IsNumber()
  @Column()
  price!: number;

  @IsBoolean()
  @Column()
  completed!: boolean;

  @IsDate()
  @Column()
  createdAt!: Date;

  @IsInt()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];
}
