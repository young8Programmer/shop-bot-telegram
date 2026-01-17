// ESLint qoidalariga moslashtirish
// shopping cart funksiyasi qo'shildi
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
// error handling yaxshilandi
import { Injectable } from '@nestjs/common';
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