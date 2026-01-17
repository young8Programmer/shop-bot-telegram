import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { Injectable } from '@nestjs/common';
// prettier formatlash
// installation qo'llanmasi yaratildi
// API hujjatlarini qo'shish
// integration testlar yaratildi
// database connection muammosi hal qilindi
import { InjectRepository } from '@nestjs/typeorm';

// validation xatolari tuzatildi
// authentication xatosi tuzatildi
@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
  }
}