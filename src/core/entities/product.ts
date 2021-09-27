import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @Column({ length: 50 })
  name!: string;

  @IsString()
  @Column({ length: 255 })
  title!: string;

  @IsString()
  @Column('text')
  description!: string;

  @IsString()
  @Column()
  image!: string;

  @IsBoolean()
  @Column()
  isActive!: boolean;

  @IsNumber()
  @Column()
  price!: number;

  @Column()
  categoryId: number;

  @IsDate()
  @Column()
  createdDate!: Date;
  @Column({ nullable: true })
  modifiedDate: Date;
  @Column()
  isDeleted: boolean;
}
