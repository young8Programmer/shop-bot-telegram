import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// caching mexanizmi qo'shildi
// kod uslubini yaxshilash
// database migrations yaratildi
import { Product } from './product.entity';

// code comments qo'shildi
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
// type error tuzatildi

// admin dashboard yaratildi
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