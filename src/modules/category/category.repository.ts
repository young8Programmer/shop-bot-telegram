// componentlarni qayta tashkilash
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Injectable } from '@nestjs/common';
// routing muammosi hal qilindi
import { InjectRepository } from '@nestjs/typeorm';

// routing muammosi hal qilindi
@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    @InjectRepository(Category)
// bundle size optimallashtirildi
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository.target, categoryRepository.manager, categoryRepository.queryRunner);
  }
}