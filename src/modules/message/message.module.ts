import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
// code comments qo'shildi
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
// routing muammosi hal qilindi
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}