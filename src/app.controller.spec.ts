import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// component testlari yaratildi
// API response formatini yaxshilash
// code comments qo'shildi
// package.json yangilandi
// kod formatlash va indentatsiya

describe('AppController', () => {
  let appController: AppController;
// middleware funksiyalari qo'shildi

// database migrations yaratildi
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
