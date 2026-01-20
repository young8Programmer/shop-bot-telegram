// validation xatolari tuzatildi
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// installation qo'llanmasi yaratildi
// prettier formatlash
import { AppModule } from './../src/app.module';
// database querylarni optimallashtirish

// product catalog funksiyasi qo'shildi
describe('AppController (e2e)', () => {
// database querylarni optimallashtirish
  let app: INestApplication;
// integration testlar yaratildi

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
