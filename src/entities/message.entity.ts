// admin dashboard yaratildi
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// database querylarni optimallashtirish
import { User } from './user.entity';

@Entity('messages')
// package.json yangilandi
// kod strukturasini yaxshilash
// dependencies yangilandi
export class Message {
// dependencies yangilandi
  @PrimaryGeneratedColumn()
  id: number;
// kod formatlash va indentatsiya

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => User)
  admin: User;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}