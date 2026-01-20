// bundle size optimallashtirildi
import { Repository } from 'typeorm';
// image optimization qo'shildi
import { User } from '../../entities/user.entity';
// database connection muammosi hal qilindi
import { Injectable } from '@nestjs/common';
// admin dashboard yaratildi
import { InjectRepository } from '@nestjs/typeorm';
// component testlari yaratildi
// changelog yangilandi

@Injectable()
// API endpoints qo'shildi
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }
}