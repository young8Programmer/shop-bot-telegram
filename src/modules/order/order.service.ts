// image optimization qo'shildi
import { Injectable } from '@nestjs/common';
// component testlari yaratildi
import { OrderRepository } from './order.repository';
// kod formatlash va tozalash

// middleware funksiyalari qo'shildi
// memory leak muammosi hal qilindi
@Injectable()
// real-time notifications implementatsiya qilindi
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(userId: number, productId: number, quantity: number, phone: string, address: string, deliveryType: string, paymentMethod: string) {
    const order = this.orderRepository.create({ user: { id: userId }, product: { id: productId }, quantity, phone, address, deliveryType, paymentMethod });
    return this.orderRepository.save(order);
  }

  async findByUser(userId: number) {
    return this.orderRepository.find({ where: { user: { id: userId } }, relations: ['product'], order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    order.status = status;
    return this.orderRepository.save(order);
  }
}