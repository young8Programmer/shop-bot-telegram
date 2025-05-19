import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async create(nameUz: string, nameRu: string, nameEn: string) {
    const category = this.categoryRepository.create({ nameUz, nameRu, nameEn });
    return this.categoryRepository.save(category);
  }
}