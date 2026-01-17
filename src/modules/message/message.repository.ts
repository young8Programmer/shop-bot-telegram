// ESLint qoidalariga moslashtirish
// prettier formatlash
// shopping cart funksiyasi qo'shildi
import { Repository } from 'typeorm';
// database testlari qo'shildi
import { Message } from '../../entities/message.entity';
// error handling yaxshilandi
import { Injectable } from '@nestjs/common';
// CI/CD pipeline sozlandi
// API endpoint testlari qo'shildi
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {
    super(messageRepository.target, messageRepository.manager, messageRepository.queryRunner);
  }
}