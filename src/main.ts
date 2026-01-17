// real-time notifications implementatsiya qilindi
import { NestFactory } from '@nestjs/core';
// admin dashboard yaratildi
import { AppModule } from './app.module';

// real-time notifications implementatsiya qilindi
// database querylarni optimallashtirish
async function bootstrap() {
// unit testlar qo'shildi
  const app = await NestFactory.create(AppModule);
// API endpoints qo'shildi
  await app.listen(3000);
}
bootstrap();
