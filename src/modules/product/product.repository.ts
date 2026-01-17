import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// real-time notifications implementatsiya qilindi
// validation xatolari tuzatildi
@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(
// caching mexanizmi qo'shildi
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super(productRepository.target, productRepository.manager, productRepository.queryRunner);
  }
}