import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

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