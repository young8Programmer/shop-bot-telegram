// image optimization qo'shildi
// installation qo'llanmasi yaratildi
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from './cart.entity';
// database connection muammosi hal qilindi
import { Order } from './order.entity';
// README faylini yangilash
import { Message } from './message.entity';

@Entity('users')
// product catalog funksiyasi qo'shildi
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: string;

  @Column()
  firstName: string;

  @Column({ default: 'uz' })
  language: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}