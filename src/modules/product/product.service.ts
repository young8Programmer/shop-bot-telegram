import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findByCategory(categoryId: number) {
    return this.productRepository.find({ where: { category: { id: categoryId }, isActive: true } });
  }

  async create(categoryId: number, nameUz: string, nameRu: string, nameEn: string, price: number, descriptionUz: string, descriptionRu: string, descriptionEn: string, imageUrl: string) {
    const product = this.productRepository.create({ category: { id: categoryId }, nameUz, nameRu, nameEn, price, descriptionUz, descriptionRu, descriptionEn, imageUrl });
    return this.productRepository.save(product);
  }

  async update(id: number, nameUz: string, nameRu: string, nameEn: string, price: number, descriptionUz: string, descriptionRu: string, descriptionEn: string, imageUrl: string, isActive: boolean) {
    const product = await this.productRepository.findOne({ where: { id } });
    product.nameUz = nameUz;
    product.nameRu = nameRu;
    product.nameEn = nameEn;
    product.price = price;
    product.descriptionUz = descriptionUz;
    product.descriptionRu = descriptionRu;
    product.descriptionEn = descriptionEn;
    product.imageUrl = imageUrl;
    product.isActive = isActive;
    return this.productRepository.save(product);
  }
}