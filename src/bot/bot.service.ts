import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { CategoryService } from '../modules/category/category.service';
import { ProductService } from '../modules/product/product.service';
import { CartService } from '../modules/cart/cart.service';
import { OrderService } from '../modules/order/order.service';
import { MessageService } from '../modules/message/message.service';

@Injectable()
export class BotService {
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
    private messageService: MessageService,
  ) {}

  async getUser(telegramId: string) {
    return this.userService.findByTelegramId(telegramId);
  }

  async createUser(telegramId: string, firstName: string, language: string) {
    return this.userService.create(telegramId, firstName, language);
  }

  async updateLanguage(telegramId: string, language: string) {
    return this.userService.updateLanguage(telegramId, language);
  }

  async getCategories() {
    return this.categoryService.findAll();
  }

  async getProducts(categoryId: number) {
    return this.productService.findByCategory(categoryId);
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    return this.cartService.add(userId, productId, quantity);
  }

  async getCart(userId: number) {
    return this.cartService.findByUser(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    return this.cartService.remove(userId, productId);
  }

  async updateCartQuantity(userId: number, productId: number, quantity: number) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  async createOrder(userId: number, productId: number, quantity: number, phone: string, address: string, deliveryType: string, paymentMethod: string) {
    return this.orderService.create(userId, productId, quantity, phone, address, deliveryType, paymentMethod);
  }

  async getOrders(userId: number) {
    return this.orderService.findByUser(userId);
  }

  async sendMessage(userId: number, adminId: number, message: string) {
    return this.messageService.create(userId, adminId, message);
  }

  async getMessages(userId: number) {
    return this.messageService.findByUser(userId);
  }
}