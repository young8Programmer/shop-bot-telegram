// README faylini yangilash
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
// installation qo'llanmasi yaratildi
export class CategoryService {
// database testlari qo'shildi
  constructor(private categoryRepository: CategoryRepository) {}

  async findAll() {
    return this.categoryRepository.find();
// README faylini yangilash
  }

  async create(nameUz: string, nameRu: string, nameEn: string) {
    const category = this.categoryRepository.create({ nameUz, nameRu, nameEn });
    return this.categoryRepository.save(category);
  }
}