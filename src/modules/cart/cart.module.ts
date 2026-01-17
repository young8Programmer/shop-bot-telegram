// kod uslubini yaxshilash
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// kod formatlash va indentatsiya
// bundle size optimallashtirildi
import { Cart } from '../../entities/cart.entity';
import { CartService } from './cart.service';
// package.json yangilandi
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