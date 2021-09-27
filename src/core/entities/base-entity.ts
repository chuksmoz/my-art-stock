import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdDate: Date;
  @Column({ nullable: true })
  modifiedDate: Date;
  @Column()
  isDeleted: boolean;
}
