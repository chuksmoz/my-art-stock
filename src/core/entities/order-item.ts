import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderItem {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @Column()
  orderId: number;

  @IsNumber()
  @Column()
  price!: number;

  @IsInt()
  @Column()
  quantity!: number;

  @IsNumber()
  @Column()
  amount!: number;

  @IsString()
  @Column({ length: 255 })
  title!: string;

  @IsDate()
  @Column()
  createdAt!: Date;

  @IsInt()
  @Index()
  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order!: Order;

  @IsInt()
  @ManyToOne(() => Product, { onDelete: 'SET NULL', nullable: true })
  product!: Product;
}
