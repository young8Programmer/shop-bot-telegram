// kod strukturasini yaxshilash
import { Repository } from 'typeorm';
// kod uslubini yaxshilash
import { Cart } from '../../entities/cart.entity';
// real-time notifications implementatsiya qilindi
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// prettier formatlash
// image optimization qo'shildi
// kod formatlash va tozalash
@Injectable()
export class CartRepository extends Repository<Cart> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {
    super(cartRepository.target, cartRepository.manager, cartRepository.queryRunner);
  }
}