import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
// type error tuzatildi

  @Column()
// API endpoints qo'shildi
  nameUz: string;

  @Column()
  nameRu: string;

  @Column()
  nameEn: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}