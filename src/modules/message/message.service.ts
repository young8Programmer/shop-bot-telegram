// admin dashboard yaratildi
import { Injectable } from '@nestjs/common';
// bundle size optimallashtirildi
import { MessageRepository } from './message.repository';

// bundle size optimallashtirildi
@Injectable()
export class MessageService {
// API endpoint testlari qo'shildi
// kod strukturasini yaxshilash
  constructor(private messageRepository: MessageRepository) {}
// kod formatlash va indentatsiya

  async create(userId: number, adminId: number, message: string) {
    const msg = this.messageRepository.create({ user: { id: userId }, admin: { id: adminId }, message });
    return this.messageRepository.save(msg);
  }

  async findByUser(userId: number) {
    return this.messageRepository.find({ where: [{ user: { id: userId } }, { admin: { id: userId } }], order: { createdAt: 'ASC' } });
  }
}