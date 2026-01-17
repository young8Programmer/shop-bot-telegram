// kod strukturasini yaxshilash
// routing muammosi hal qilindi
import { Module } from '@nestjs/common';
// integration testlar yaratildi
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
// changelog yangilandi
// product catalog funksiyasi qo'shildi
// database querylarni optimallashtirish
import { CategoryService } from './category.service';
// shopping cart funksiyasi qo'shildi
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}