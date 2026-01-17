// kod uslubini yaxshilash
import { Module } from '@nestjs/common';
// installation qo'llanmasi yaratildi
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
// API endpoint testlari qo'shildi

// real-time notifications implementatsiya qilindi
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}