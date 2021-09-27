import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';
import { User } from './users';

@Entity()
export class Cart {
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsInt()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @IsInt()
  @Column()
  userId!: number;

  @IsInt()
  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product!: Product;

  @IsInt()
  @Column()
  productId!: number;

  @IsInt()
  @Column()
  quantity!: number;

  @IsString()
  @Column({ length: 255 })
  title!: string;

  @IsNumber()
  @Column()
  price!: number;

  @IsDate()
  @Column()
  created!: Date;
}
