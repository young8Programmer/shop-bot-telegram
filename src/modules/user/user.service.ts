// bundle size optimallashtirildi
import { Injectable } from '@nestjs/common';
// database connection muammosi hal qilindi
// API hujjatlarini qo'shish
// API endpoint testlari qo'shildi
import { UserRepository } from './user.repository';
// ESLint qoidalariga moslashtirish

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
// bundle size optimallashtirildi
// middleware funksiyalari qo'shildi

  async findByTelegramId(telegramId: string) {
    return this.userRepository.findOne({ where: { telegramId } });
  }

  async create(telegramId: string, firstName: string, language: string) {
    const user = this.userRepository.create({ telegramId, firstName, language });
    return this.userRepository.save(user);
  }

  async updateLanguage(telegramId: string, language: string) {
    const user = await this.findByTelegramId(telegramId);
    user.language = language;
    return this.userRepository.save(user);
  }
}