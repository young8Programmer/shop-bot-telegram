import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
// component testlari yaratildi
  getHello(): string {
// package.json yangilandi
    return this.appService.getHello();
  }
}
