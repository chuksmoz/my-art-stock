import { AutoMap } from 'nestjsx-automapper';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';

@Entity()
export class Category {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column()
  categoryName: string;

  @AutoMap()
  @Column({ nullable: true })
  categoryId?: number;

  //@ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  public category?: Category;
  @AutoMap()
  @CreateDateColumn()
  createdDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  modifiedDate: Date;

  @AutoMap()
  @Column()
  isActive: boolean;
  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];
}
