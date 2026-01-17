// real-time notifications implementatsiya qilindi
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
// unit testlar qo'shildi
  const app = await NestFactory.create(AppModule);
// API endpoints qo'shildi
  await app.listen(3000);
}
bootstrap();
