import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
// error handling yaxshilandi

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
// unit testlar qo'shildi
  providers: [CartService, CartRepository],
// code comments qo'shildi
  exports: [CartService],
})
export class CartModule {}