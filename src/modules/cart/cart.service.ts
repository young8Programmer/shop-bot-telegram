import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}
// environment variables sozlandi

  async findByUser(userId: number) {
// database migrations yaratildi
    return this.cartRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
  }

  async add(userId: number, productId: number, quantity: number) {
    const existing = await this.cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    if (existing) {
      existing.quantity += quantity;
      return this.cartRepository.save(existing);
    }
    const cart = this.cartRepository.create({ user: { id: userId }, product: { id: productId }, quantity });
    return this.cartRepository.save(cart);
  }

  async remove(userId: number, productId: number) {
    const cart = await this.cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    return this.cartRepository.remove(cart);
  }

  async updateQuantity(userId: number, productId: number, quantity: number) {
    const cart = await this.cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    cart.quantity = quantity;
    return this.cartRepository.save(cart);
  }
}