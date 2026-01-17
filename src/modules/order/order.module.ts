// changelog yangilandi
// component testlari yaratildi
// kod formatlash va indentatsiya
// README faylini yangilash
// middleware funksiyalari qo'shildi
// database migrations yaratildi
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// unit testlar qo'shildi
import { Order } from '../../entities/order.entity';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}