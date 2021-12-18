import { SubContributor } from './sub-contributor';
import { Category } from './category';
import { AutoMap } from '@nartc/automapper';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contributor } from './contributor';

@Entity()
export class Product {
  @AutoMap()
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @IsInt()
  @Column({ nullable: true })
  userId: number;

  @AutoMap()
  @IsString()
  @Column({ length: 255 })
  title: string;

  @AutoMap()
  @IsString()
  @Column('text')
  caption: string;

  @AutoMap()
  @IsString()
  @Column()
  imageUrl: string;

  @AutoMap()
  @IsString()
  @Column({ nullable: true })
  videoUrl: string;

  @AutoMap()
  @IsString()
  @Column({ nullable: true })
  genre: string;

  @AutoMap()
  @IsString()
  @Column({ nullable: true })
  mood: string;

  @AutoMap()
  @IsString()
  @Column('text')
  lyrics: string;

  @AutoMap()
  @IsBoolean()
  @Column()
  isActive: boolean;

  @AutoMap()
  @IsNumber()
  @Column({ nullable: true })
  price: number;

  @AutoMap()
  @Column()
  categoryId: number;

  @AutoMap()
  @Column('simple-array', { nullable: true })
  tags: string[];

  @AutoMap()
  @IsDate()
  @Column()
  createdDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  modifiedDate: Date;

  @Column()
  isDeleted: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  /* @ManyToOne(() => SubContributor, (subContributor) => subContributor.products)
  subContributor: SubContributor;
  @ManyToOne(() => Contributor, (contributor) => contributor.products)
  contributor: Contributor; */
}
