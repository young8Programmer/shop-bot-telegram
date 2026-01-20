// changelog yangilandi
// database querylarni optimallashtirish
// caching mexanizmi qo'shildi
// installation qo'llanmasi yaratildi
// ESLint qoidalariga moslashtirish
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
// API endpoints qo'shildi
// changelog yangilandi
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}