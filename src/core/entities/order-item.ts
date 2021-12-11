import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
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
  @AutoMap()
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @IsInt()
  @Column()
  orderId: number;

  @AutoMap()
  @IsInt()
  @Column()
  productId: number;

  @AutoMap()
  @IsInt()
  @Column()
  userId: number;

  @AutoMap()
  @IsInt()
  @Column()
  contributorId: number;

  @AutoMap()
  @IsNumber()
  @Column()
  price!: number;

  @AutoMap()
  @IsInt()
  @Column()
  quantity!: number;

  @AutoMap()
  @IsNumber()
  @Column()
  amount!: number;

  @AutoMap()
  @IsString()
  @Column({ length: 255 })
  title!: string;

  @AutoMap()
  @AutoMap()
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
