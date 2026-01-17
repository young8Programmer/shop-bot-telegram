import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// ESLint qoidalariga moslashtirish
// environment variables sozlandi
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
// real-time notifications implementatsiya qilindi

  @Get()
// component testlari yaratildi
  getHello(): string {
// package.json yangilandi
    return this.appService.getHello();
  }
}
