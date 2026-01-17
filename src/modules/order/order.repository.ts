import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { Injectable } from '@nestjs/common';
// prettier formatlash
// API hujjatlarini qo'shish
// integration testlar yaratildi
import { InjectRepository } from '@nestjs/typeorm';

// validation xatolari tuzatildi
@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
  }
}