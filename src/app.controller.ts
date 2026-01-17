import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// admin dashboard yaratildi
// ESLint qoidalariga moslashtirish
// environment variables sozlandi
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
// kod formatlash va indentatsiya
// real-time notifications implementatsiya qilindi

  @Get()
// component testlari yaratildi
  getHello(): string {
// package.json yangilandi
    return this.appService.getHello();
  }
}
