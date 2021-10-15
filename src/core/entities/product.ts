import { AutoMap } from '@nartc/automapper';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @AutoMap()
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @AutoMap()
  @IsString()
  @Column({ length: 50 })
  name!: string;

  @AutoMap()
  @IsString()
  @Column({ length: 255 })
  title!: string;

  @AutoMap()
  @IsString()
  @Column('text')
  description!: string;

  @AutoMap()
  @IsString()
  @Column()
  imageUrl!: string;

  @AutoMap()
  @IsBoolean()
  @Column()
  isActive!: boolean;

  @AutoMap()
  @IsNumber()
  @Column()
  price!: number;

  @AutoMap()
  @Column()
  categoryId: number;

  @Column('simple-array')
  tags: string[];

  @IsDate()
  @Column()
  createdDate!: Date;
  @Column({ nullable: true })
  modifiedDate: Date;
  @Column()
  isDeleted: boolean;
}
